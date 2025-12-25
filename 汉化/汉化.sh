#!/bin/bash

# 设置UTF-8编码环境
export LANG=C.UTF-8
export LC_ALL=C.UTF-8
export LANGUAGE=C.UTF-8

# ==============================================================================
# 脚本名称: 汉化.sh
# 功能描述: 从JSON文件中读取规则，在目标文件中执行多组内容的替换。
#           此版本使用 perl，能完美处理替换内容中的特殊字符。
# 依赖:    jq (JSON处理器), perl
# 使用方法: ./汉化.sh <规则文件.json> <目标文件模式>
# ==============================================================================

# 初始化和参数检查
if [ "$#" -ne 2 ]; then
    echo "错误：请提供两个参数。"
    echo "用法: $0 <规则文件.json> <目标文件模式>"
    echo "示例: $0 rules.json 代码/dist/assets/Home-"
    exit 1
fi

RULES_FILE="$1"
TARGET_PATTERN="$2"

# 检测使用命令

if ! command -v jq &> /dev/null; then
    echo "错误：此脚本需要 'jq' 工具。"
    echo "安装命令： apt update && apt install jq"
    exit 1
fi

if ! command -v perl &> /dev/null; then
    echo "错误：此脚本需要 'perl' 工具。"
    exit 1
fi

if [ ! -f "$RULES_FILE" ]; then
    echo "错误：规则文件 '$RULES_FILE' 不存在。"
    exit 1
fi

# 提取目录和文件前缀
DIRECTORY=$(dirname "$TARGET_PATTERN")
FILE_PREFIX=$(basename "$TARGET_PATTERN")

# 定义需要忽略的文件后缀数组
IGNORE_EXTENSIONS=("png" "ico" "svg" "ttf" "css")

# 查找匹配的文件（排除指定后缀的文件）
MAPFILE_COMMAND="find \"$DIRECTORY\" -maxdepth 1 -name \"${FILE_PREFIX}*\" -type f"
for ext in "${IGNORE_EXTENSIONS[@]}"; do
    MAPFILE_COMMAND+=" -not -name \"*.${ext}\""
done
MAPFILE_COMMAND+=" | sort"

mapfile -t MATCHED_FILES < <(eval "$MAPFILE_COMMAND")

# 检查是否有匹配的文件
if [ ${#MATCHED_FILES[@]} -eq 0 ]; then
    echo "错误：在目录 '$DIRECTORY' 中没有找到以 '$FILE_PREFIX' 开头的文件。"
    exit 1
fi

# 输出匹配信息
echo ""
echo "总共找到 ${#MATCHED_FILES[@]} 个匹配的文件："
for file in "${MATCHED_FILES[@]}"; do
    echo "  $file"
done
echo ""

TARGET_FILE="${MATCHED_FILES[0]}"
echo "第一个匹配的文件是: $TARGET_FILE"
echo ""

if [ ! -w "$TARGET_FILE" ]; then
    echo "错误：目标文件 '$TARGET_FILE' 不可写。"
    exit 1
fi

perform_replacement() {
    local original="$1"
    local replacement="$2"
    local target_file="$3"
    
    # 创建一个临时文件
    local temp_file="${target_file}.tmp.$$"
    
    # 计算替换次数并执行替换
    local count=$(perl -0777 -pe "
        BEGIN { 
            \$orig = q[$original]; 
            \$repl = q[$replacement];
            \$count = 0; 
        } 
        \$count += s/\$orig/\$repl/g;
        END { print STDERR \$count }
    " < "$target_file" 2>"${temp_file}.count")
    
    # 获取替换次数
    local replacement_count=$(cat "${temp_file}.count")
    
    # 将替换后的内容写入文件
    echo "$count" > "$target_file"
    
    # 清理临时文件
    rm -f "${temp_file}.count"
    
    # 如果不是数字，默认为0
    if ! [[ "$replacement_count" =~ ^[0-9]+$ ]]; then
        replacement_count=0
    fi
    
    # 返回替换次数
    echo "$replacement_count"
}

# --- 从JSON文件中读取规则并执行替换 ---
total_groups=0
success_count=0
failure_count=0
zero_count=0
error_count=0
declare -a FAILED_GROUPS=()
declare -a ZERO_REPLACEMENT_GROUPS=()

echo "----------------------------------------"
echo "从规则文件 '$RULES_FILE' 中读取替换规则..."
echo "开始对文件 '$TARGET_FILE' 进行替换..."
echo "----------------------------------------"

while IFS= read -r rule; do
    original_content=$(echo "$rule" | jq -r '.["原文"]')
    replacement_content=$(echo "$rule" | jq -r '.["翻译"]')

    if [ "$original_content" == "null" ] || [ "$replacement_content" == "null" ]; then
        echo "❌ [JSON解析错误] 跳过无效规则: $rule"
        ((failure_count++))
        continue
    elif [ -z "$original_content" ]; then
        echo "⚠️  [原文为空] 跳过空规则: $rule"
        continue
    fi
    
    ((total_groups++))

    # --- 核心替换逻辑：使用 perl ---
    replacement_count=$(perform_replacement "$original_content" "$replacement_content" "$TARGET_FILE")
    perl_exit_code=$?

    if [ $perl_exit_code -eq 0 ] && [ "$replacement_count" -gt 0 ]; then
        echo "  ✅ ${replacement_count} [${original_content}] 替换成功"
        ((success_count++))
    elif [ $perl_exit_code -eq 0 ] && [ "$replacement_count" -eq 0 ]; then
        echo "  ⚠️  0 [${original_content}] 未找到匹配内容"
        ((zero_count++))
        ZERO_REPLACEMENT_GROUPS+=("$original_content")
    else
        echo "  ❌ [${original_content}] 替换出错"
        echo ""
        ((error_count++))
        FAILED_GROUPS+=("$original_content")
    fi
done < <(jq -c '.[]' "$RULES_FILE")

# --- 输出最终总结报告 ---
echo "----------------------------------------"
echo "所有替换任务已完成。"
echo "----------------------------------------"
echo "总结报告："
echo "  - 需要替换的内容总共有: ${total_groups} 组"
echo "  - 替换成功的组数: ${success_count} 组"
echo "  - 未找到匹配内容的组数: ${zero_count} 组"
echo "  - 替换出错的组数: ${error_count} 组"

if [ $zero_count -gt 0 ]; then
    echo ""
    echo "----------------------------------------"
    echo "以下是所有未找到匹配内容的组："
    echo "----------------------------------------"
    for zero_original in "${ZERO_REPLACEMENT_GROUPS[@]}"; do
        echo "  - [${zero_original}]"
    done
fi

if [ ${#FAILED_GROUPS[@]} -gt 0 ]; then
    echo ""
    echo "----------------------------------------"
    echo "以下是所有替换出错的组内容："
    echo "----------------------------------------"
    for failed_original in "${FAILED_GROUPS[@]}"; do
        echo "  - [${failed_original}]"
    done
fi

echo ""
echo "脚本执行结束。"
echo ""

exit 0
