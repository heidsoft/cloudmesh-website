# CloudMesh 官网

> AI 驱动的智能 IT 管理平台官网

[CloudMesh](https://cloudmesh.top) 是一个开源的 IT 服务管理平台，基于 ITIL 最佳实践，帮助企业实现高效的 IT 运维管理。

## 🎯 产品定位

- **ClawOps**：AI 驱动的 DevOps 自动化平台
- **ITSM**：开源 IT 服务管理解决方案
- **智能补货助手**：AI 销量预测与智能补货

## 🌟 核心功能

- 多云统一管理
- AI 监控告警
- 自动化运维
- ITSM 工单系统
- DevOps 流水线

## 📦 开源项目

| 项目 | 描述 | Stars |
|------|------|-------|
| [cloudmesh-website](https://github.com/heidsoft/cloudmesh-website) | 官网仓库 | - |
| [itsm](https://github.com/heidsoft/itsm) | ITSM 核心项目 (Go + Next.js) | ⭐ |

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/heidsoft/cloudmesh-website.git
cd cloudmesh-website

# 本地预览（使用任意静态服务器）
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 📁 项目结构

```
cloudmesh-website/
├── blog/           # 技术博客
├── products/       # 产品页面
├── solutions/      # 解决方案
├── docs/           # 开发文档
├── open-source/    # 开源社区页面
├── skills/         # Skill 文档
├── css/            # 样式文件
├── js/             # JavaScript
├── assets/         # 静态资源
└── icons/          # 图标资源
```

## 🔧 技术栈

- **前端**：HTML5 + CSS3 + Vanilla JavaScript
- **样式**：自定义 CSS + Bootstrap 5
- **图标**：Font Awesome 6
- **部署**：Nginx 静态托管

## 📝 博客写作

博客文件位于 `blog/` 目录，使用 HTML 格式编写。

发布流程：
1. 编写博客到 `blog/` 目录
2. 复制到 nginx 目录：`cp blog/*.html /usr/share/nginx/html/blog/`
3. 更新博客列表 `blog/index.html`

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

贡献流程：
1. Fork 本仓库
2. 创建分支 (`git checkout -b feature/YourFeature`)
3. 提交更改 (`git commit -m 'Add some feature'`)
4. 推送到分支 (`git push origin feature/YourFeature`)
5. 创建 Pull Request

## 📄 开源协议

本项目采用 [MIT License](LICENSE)

## 📬 联系我们

- 🌐 官网：[https://cloudmesh.top](https://cloudmesh.top)
- 📧 邮箱：contact@cloudmesh.top
- 💬 GitHub：[https://github.com/heidsoft](https://github.com/heidsoft)
