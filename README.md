# CloudMesh 官网

CloudMesh 官方网站 - AI 驱动的智能部署管理平台

## 🌐 网站结构

```
cloudmesh-website/
├── index.html          # 官网首页
├── pages/
│   ├── products.html   # 产品介绍
│   ├── news.html       # 新闻中心
│   ├── about.html      # 关于我们
│   └── contact.html    # 联系我们
├── assets/
│   ├── css/           # 样式文件
│   ├── js/            # JavaScript 文件
│   └── images/        # 图片资源
└── README.md          # 项目说明
```

## 🌐 域名结构

- **主官网**: https://cloudmesh.top/
- **部署系统**: https://deploy.cloudmesh.top/
- **管理后台**: https://deploy.cloudmesh.top/login.html

## 🚀 部署

### Nginx 配置

```nginx
# 主官网
server {
    listen 80;
    server_name cloudmesh.top www.cloudmesh.top;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 部署系统子站
server {
    listen 80;
    server_name deploy.cloudmesh.top;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

## 📦 技术栈

- HTML5 + CSS3 + JavaScript
- Bootstrap 5
- Font Awesome
- Nginx

## 📝 更新日志

### v1.0.0 (2026-03-02)
- 官网首页
- AI 新闻模块
- 响应式设计
