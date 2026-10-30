// @ts-expect-error
const 脚本参数: string[] = Bun.argv;

const 规则文件路径: string = 脚本参数[2];
const 待汉化文件路径: string = 脚本参数[3];

// @ts-expect-error
const 本文件所在目录: string = import.meta.dir;
// @ts-expect-error
const 执行命令目录: string = process.cwd();

const 规则文件绝对路径 = `${执行命令目录}/${规则文件路径}`;
const 待汉化文件绝对路径 = `${执行命令目录}/${待汉化文件路径}`;

// @ts-expect-error
const 规则文件 = Bun.file(规则文件绝对路径);
const 规则文件大小: number = await 规则文件.size;

// @ts-expect-error
const 待汉化文件 = Bun.file(待汉化文件绝对路径);
const 待汉化文件大小: number = await 待汉化文件.size;

if (规则文件大小 === 0) {
  console.error(`错误：规则文件 '${规则文件路径}' 不存在或内容为空！`);
  // @ts-expect-error
  process.exit(1);
}

if (待汉化文件大小 === 0) {
  console.error(`错误：待汉化文件 '${待汉化文件路径}' 不存在或内容为空！`);
  // @ts-expect-error
  process.exit(1);
}

interface t_规则 {
  原文: string;
  翻译: string;
  正则: boolean;
}
const 规则文件内容: t_规则[] = await 规则文件.json();
let const_待汉化文件内容: string = await 待汉化文件.text();
let let_替换后文件内容: string = const_待汉化文件内容;

let let_发生替换规则数量: number = 0;
let let_替换成功规则数: number = 0;
let let_未匹配: string[] = [];
let let_替换出错: string[] = [];

console.log();
for (let 索引 = 0; 索引 < 规则文件内容.length; 索引++) {
  const 规则 = 规则文件内容[索引];
  if (!规则.原文) {
    console.log("规则中原文不存在，跳过！");
    continue;
  }
  let_发生替换规则数量 += 1;
  let 替换次数: number = 0;
  if (规则.正则 === true) {
    try {
      console.log(`  ✅ [${规则.原文}] 替换 ${替换次数} 次`);
    } catch (e) {
      let_替换出错.push(规则.原文);
      console.error(`  ❌ [${规则.原文}] 替换出错`, e);
    }
    continue;
  }

  if (规则.原文.includes(" ")) {
    try {
      const 原文空格正则转义 = 规则.原文.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const 包含多空格正则的字符串 = 原文空格正则转义.replace(/ /g, "\\s+");
      const 动态正则 = new RegExp(包含多空格正则的字符串, "g");

      const 匹配到的数组 = let_替换后文件内容.match(动态正则);
      const 替换次数 = 匹配到的数组 ? 匹配到的数组.length : 0;
      if (替换次数 === 0) {
        let_未匹配.push(规则.原文);
        continue;
      }

      let_替换后文件内容 = let_替换后文件内容.replace(动态正则, 规则.翻译);
      let_替换成功规则数 += 1;
      console.log(`  ✅ [${规则.原文}] 替换 ${替换次数} 次`);
    } catch (e) {
      let_替换出错.push(规则.原文);
      console.error(`  ❌ [${规则.原文}] 替换出错`, e);
    }
    continue;
  }

  try {
    替换次数 = const_待汉化文件内容.split(规则.原文).length - 1;
    if (替换次数 === 0) {
      let_未匹配.push(规则.原文);
      continue;
    }

    let_替换后文件内容 = let_替换后文件内容.replaceAll(规则.原文, 规则.翻译);
    let_替换成功规则数 += 1;
    console.log(`  ✅ [${规则.原文}] 替换 ${替换次数} 次`);
  } catch (e) {
    let_替换出错.push(规则.原文);
    console.error(`  ❌ [${规则.原文}] 替换出错`, e);
  }
}

// @ts-expect-error
await Bun.write(待汉化文件绝对路径, let_替换后文件内容);

console.log();
console.log("------------------ 替换统计 ----------------------");
console.log();

console.log(`  - 需要替换的内容总共有: ${let_发生替换规则数量} 组`);
console.log(`  - 替换成功的组数: ${let_替换成功规则数} 组`);
console.log(`  - 未找到匹配内容的组数: ${let_未匹配.length} 组`);
console.log(`  - 替换出错的组数: ${let_替换出错.length} 组`);

if (let_未匹配.length) {
  console.log();
  console.log("------------------ 未匹配 ----------------------");
  console.log();
  for (const 未匹配 of let_未匹配) {
    console.log(`  - 内容：[ ${未匹配} ]`);
  }
}

if (let_替换出错.length) {
  console.log();
  console.log("------------------ 替换出错 ----------------------");
  console.log();
  for (const 替换出错 of let_替换出错) {
    console.log(`  - 内容：[ ${替换出错} ]`);
  }
}

console.log();
export {};
