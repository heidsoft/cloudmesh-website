# cloudmesh.top 官网风格规范

## 导航栏标准（必须统一）

### 完整导航栏（10项）
所有页面必须使用以下标准导航栏，链接数量不得删减：

```html
<nav class="navbar navbar-expand-lg" id="navbar">
        <div class="container">
            <a class="navbar-brand" href="/">
                <i class="fas fa-cloud"></i>
                CloudMesh
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="/">首页</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">产品</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/products/clawops.html"><i class="fas fa-rocket"></i> ClawOps</a></li>
                            <li><a class="dropdown-item" href="/products/itsm.html"><i class="fas fa-ticket-alt"></i> ITSM</a></li>
                            <li><a class="dropdown-item" href="/products/smart-replenishment.html"><i class="fas fa-boxes"></i> 智能补货助手</a></li>
                            <li><a class="dropdown-item" href="/products/contract-review.html"><i class="fas fa-file-contract"></i> 合同审核助手</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/openclaw-generator/"><i class="fas fa-wrench"></i> 配置生成器 <span class="badge bg-success text-dark ms-1">免费</span></a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="/solutions/">解决方案</a></li>
                    <li class="nav-item"><a class="nav-link" href="/open-source/">开源</a></li>
                    <li class="nav-item"><a class="nav-link" href="/blog/">博客</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pricing.html">定价</a></li>
                    <li class="nav-item"><a class="nav-link" href="/docs/quickstart.html">文档</a></li>
                    <li class="nav-item"><a class="nav-link" href="/contact/">联系</a></li>
                    <li class="nav-item"><a class="nav-link" href="/login.html">登录</a></li>
                    <li class="nav-item">
                        <a class="nav-link btn-trial ms-2" href="/deploy/">
                            <i class="fas fa-rocket"></i> 免费试用
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
```

### Active 状态规则
| 页面类型 | active 链接 |
|---------|------------|
| 首页 | 首页 |
| 博客文章页 | 博客 |
| 产品页（clawops.html等） | 产品 + 对应产品项 |
| 解决方案页 | 解决方案 |
| 定价页 | 定价 |
| 文档页 | 文档 |

### 常见错误（禁止出现）
- ❌ 损坏的active语法：`class="nav-link class="active""`
- ❌ 非标准链接：`onclick="showSection()"`
- ❌ 缺失产品项（智能补货助手、合同审核助手）
- ❌ 试用按钮指向非 /deploy/ 地址
- ❌ 简化导航栏（只有2-3个链接）

### 部署
- 代码路径：`/root/.openclaw/workspace/cloudmesh-website/`
- nginx路径：`/usr/share/nginx/html/`
- 同步命令：`cp -r /root/.openclaw/workspace/cloudmesh-website/* /usr/share/nginx/html/`
- 重载nginx：`kill -HUP $(ps aux | grep 'nginx: master' | grep -v grep | awk '{print $2}')`

---
更新：2026-05-04