<div align="center">
  <img src="/assets/banner.png" alt="Moodist Logo Banner" />
  <h2>Moodist 🌲</h2>
  <p>Ambient sounds for focus and calm.</p>
  <p>环境音助您专注与平静。</p>
  <a href="https://moodist.mvze.net">Visit <strong>Moodist</strong></a> | <a href="https://buymeacoffee.com/remvze">Buy Me a Coffee</a>
  <br />
  <a href="https://moodist.mvze.net">访问 <strong>Moodist</strong> (原项目作者提供的，英文)</a> | <a href="https://buymeacoffee.com/remvze">请我喝杯咖啡(项目原作者)</a>
</div>

## 汉化&修改

当前制作镜像版本：2.1.0  
汉化及镜像制作时间 2023.07.09

首先感谢原作者的开源。[原项目地址](https://github.com/remvze/moodist)  
原项目没有中文，我制作了汉化docker镜像

具体汉化了那些内容，请参考[翻译说明](./翻译说明.md)。

只做了汉化和简单修改，有问题，请到原作者仓库处反馈。

欢迎关注我B站账号 [秦曱凧](https://space.bilibili.com/17547201) (读作 qín yuē zhēng)  

有需要帮忙部署这个项目的朋友,一杯奶茶,即可程远程帮你部署，需要可联系。  
微信号 `E-0_0-`  
闲鱼搜索用户 `明月人间`  
或者邮箱 `firfe163@163.com`  
如果这个项目有帮到你。欢迎start。

有其他的项目的汉化需求，欢迎提issue。或其他方式联系通知。

### 镜像

从阿里云或华为云镜像仓库拉取镜像，注意填写镜像标签，镜像仓库中没有`latest`标签

容器内部端口`3000`，可通过设置启动参数来指定监听端口。

```bash
docker pull crpi-aiy5xfxuied4b3f9.cn-chengdu.personal.cr.aliyuncs.com/firfe/moodist:2.1.0
```

### docker run 命令部署

```bash
docker run -d \
--name moodist \
--network bridge \
--restart always \
--log-opt max-size=1m \
--log-opt max-file=1 \
-p 端口:3000 \
crpi-aiy5xfxuied4b3f9.cn-chengdu.personal.cr.aliyuncs.com/firfe/moodist:2.1.0
```
在命令最后追加`-p 端口`自定义端口

### compose 文件部署 👍推荐

```yaml
#version: '3'
name: moodist
services:
  moodist:
    container_name: moodist
    image: crpi-aiy5xfxuied4b3f9.cn-chengdu.personal.cr.aliyuncs.com/firfe/moodist:2.1.0
    network_mode: bridge
    restart: always
    logging:
      options:
        max-size: 1m
        max-file: '1'
    ports:
      - 端口:3000
    # 指定端口
    # command: ["-p", "自定义端口"] 
```

### 修改说明

这里对除了汉化之外的代码修改的说明。  
增加修改部分具体见 [修改说明](./修改说明.md)。

`./README.md` 文件翻译，增加 `## 汉化&修改`

新增文件 `./翻译说明.md`、`./修改说明.md`、`./本地调试命令记录.md`

### 效果截图

请查看 Wiki


## Table of Contents 目录

- ⚡ [Features 特性](#features-特性)
- 🧰 [Tools 工具](#tools-工具)
- 🔮 [Commands 命令](#commands-命令)
- 🚧 [Contributing 贡献](#contributing-贡献)
- ⭐ [Support 支持](#support-moodist-支持)
- 📜 [License 许可证](#license-许可证)

## Features 特性

1. 🎵 Over 75 ambient sounds.  
   🎵 超过75种(目前84种)环境音效。
1. 📝 Persistent sound selection.  
   📝 持久化的声音选择：您的声音偏好将被记住，即使关闭应用后再次打开也能保持不变。
1. ✈️ Sharing sound selections with others.  
   ✈️ 分享声音选择：轻松与他人共享您喜爱的声音组合。
1. 🧰 Custom sound presets.  
   🧰 自定义声音预设：创建并保存您自己的声音配置。
1. 🌙 Sleep timer for sounds.  
   🌙 声音睡眠定时器：设置倒计时，定时关闭。
1. 📓 Notepad for quick notes.  
   📓 便签功能：快速记录您的想法和笔记。
1. 🍅 Pomodoro timer.  
   🍅 番茄钟计时器：帮助您高效管理时间和任务。
1. ✅ Simple to-do list (soon).  
   ✅ 简易待办事项列表（即将推出）：轻松管理日常任务。
1. ⏯️ Media controls.  
   ⏯️ 媒体控制。
1. ⌨️ Keyboard shortcuts for everything.  
   ⌨️ 全局快捷键支持：通过键盘快捷键操作所有功能，提升效率。
1. 🥷 Privacy focused: no data collection.  
   🥷 注重隐私：不收集任何用户数据，保护您的隐私安全。
1. 💰 Completely free, open-source, and self-hostable.  
   💰 完全免费且开源：您可以自由下载、使用及自行托管。

## Tools 工具

- ⚡ **TypeScript**: Programming Language 编程语言
- 🔨 **React**: UI Library 用户界面库
- 🧑‍🚀 **Astro**: Meta Framework 元框架
- 🎨 **CSS Modules**: Styling 样式模块化
- 🐻 **Zustand**: State Management 状态管理库
- 🎭 **Framer Motion**: Animation Library 动画库
- ⚙️ **Radix**: Accessible Components 无障碍组件库
- 📕 **Storybook**: Component Documentation 组件文档工具
- 🧪 **Vitest**: Unit Testing (soon) 单元测试（即将推出）
- 🔭 **Playwright**: End-To-End Testing (soon) 端到端测试（即将推出）
- 🔍 **ESLint**: Code Linting 代码检查工具
- 🧹 **Prettier**: Code Formatting 代码格式化工具
- 🧼 **Stylelint**: CSS Linting 检查工具
- 🐶 **Husky**: Git Hooks 钩子管理工具
- 📝 **Lint Staged**: Running Linters on Staged Files 对暂存文件运行检查工具
- 🧽 **Commitlint**: Git Commit Linting 提交信息检查工具
- 🧭 **Commitizen**: Git Commit Message Helper 提交信息助手
- 📓 **Standard Version**: Versioning and CHANGLOG Generation 版本管理和 CHANGELOG 生成工具
- 🧰 **PostCSS**: CSS Transformations 转换工具

## Commands 命令

- `npm run dev`: run development server 启动开发服务器
- `npm run build`: build for production 构建生产环境版本
- `npm run preview`: preview the built app 预览已构建的应用
- `npm run lint`: lint files using ESLint 使用 ESLint 检查文件
- `npm run lint:fix`: lint and fix using ESLint 使用 ESLint 检查并自动修复文件
- `npm run lint:style`: lint styles using Stylelint 使用 Stylelint 检查样式
- `npm run lint:style:fix`: lint and fix styles using Stylelint 使用 Stylelint 检查并自动修复样式
- `npm run format`: format files using Prettier 使用 Prettier 格式化文件
- `npm run commit`: commit message using Commitizen 使用 Commitizen 引导提交信息
- `npm run release:major`: release major version 发布主版本更新
- `npm run release:minor`: release minor version 发布次版本更新
- `npm run release:patch`: release patch version 发布修订版本更新
- `npm run storybook`: run 启动 Storybook

## Contributing 贡献

🚧 Please check [CONTRIBUTING.md](CONTRIBUTING.md) file.  
🚧 请检查 [CONTRIBUTING.md](CONTRIBUTING.md) 文件。

## Support Moodist

⭐ Give a star if you liked this project.  
⭐ 如果您喜欢这个项目，请给它一个星标。

☕ [Buy Me a Coffee](https://buymeacoffee.com/remvze) to help me maintain Moodist.  
☕ [请我喝杯咖啡](https://buymeacoffee.com/remvze)(原作者) 帮助我维护 Moodist。

## License 许可证

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.  
本项目采用 **MIT 许可证** 进行授权 -  详情请参阅 [LICENSE](LICENSE) 文件。


### ⚠️ Third-Party Assets 第三方资源

Some sounds used in this project are sourced from third-party providers and **are subject to different licenses**:  
本项目中使用的一些音效来源于第三方提供商，并 **受不同的许可证约束**:

- Sounds licensed under the **Pixabay Content License**: [Pixabay Content License](https://pixabay.com/service/license-summary/)  
  受 **Pixabay 内容许可协议** 许可的音效: [Pixabay 内容许可协议](https://pixabay.com/service/license-summary/)
- Sounds licensed under **CC0**: [Creative Commons Zero License](https://creativecommons.org/publicdomain/zero/1.0/)  
受 **CC0** 协议许可的音效: [Creative Commons Zero 许可证](https://creativecommons.org/publicdomain/zero/1.0/)
