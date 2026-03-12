/**
 * CloudMesh 国际化 (i18n) 支持
 * 自动检测用户语言，提供中英文切换
 */

// 语言包
const i18n = {
  zh: {
    // 导航栏
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.opensource': '开源',
    'nav.blog': '博客',
    'nav.pricing': '定价',
    'nav.docs': '文档',
    'nav.contact': '联系',
    'nav.login': '登录',
    'nav.trial': '免费试用',
    
    // 产品
    'product.openclaw': 'OpenClaw',
    'product.openclaw.desc': 'AI 驱动的一人 DevOps 团队',
    'product.itsm': 'ITSM',
    'product.itsm.desc': '企业级 IT 服务管理平台',
    'product.config': '配置生成器',
    'product.config.desc': '3 分钟完成 OpenClaw 配置',
    'product.config.badge': '免费',
    
    // 首页
    'home.hero.badge': 'AI-Driven DevOps Platform',
    'home.hero.title1': '让 IT 管理更',
    'home.hero.title1.highlight': '简单',
    'home.hero.title2': '让业务运营更',
    'home.hero.title2.highlight': '高效',
    'home.hero.subtitle': 'CloudMesh 提供完整的 IT 管理平台，从部署到运维，从工单到知识库，一站式解决企业 IT 管理需求',
    'home.hero.trial': '开始免费试用',
    'home.hero.learn': '了解产品',
    
    // 产品特性
    'features.title': '核心优势',
    'features.subtitle': '为什么选择 CloudMesh',
    'features.ai.title': 'AI 智能赋能',
    'features.ai.desc': 'AI 驱动的自动化和智能分析，异常检测、根因分析、性能优化建议，让运维更智能',
    'features.fast.title': '快速部署',
    'features.fast.desc': '分钟级部署上线，一键部署、蓝绿发布、金丝雀发布，无需复杂配置，开箱即用',
    'features.secure.title': '安全可靠',
    'features.secure.desc': '企业级安全保护，数据加密传输，权限管理，审计日志，99.9% 可用性保障',
    'features.data.title': '数据驱动',
    'features.data.desc': '多维度数据分析报表，可视化仪表盘，容量预测，成本优化，助力科学决策',
    'features.flexible.title': '灵活扩展',
    'features.flexible.desc': '模块化设计，按需选择，支持私有化部署，API 开放集成，随业务增长而扩展',
    'features.support.title': '专业服务',
    'features.support.desc': '7x24 小时技术支持，专业团队全程陪伴，知识库，社区互助，快速响应',
    
    // Skill 市场
    'skills.title': '🧩 Skill 技能市场',
    'skills.subtitle': '像安装 App 一样扩展你的 AI 助手能力',
    'skills.view.all': '浏览全部 Skills',
    'skills.guide': '使用指南',
    
    // CTA
    'cta.title': '准备好开始了吗？',
    'cta.subtitle': '立即免费试用 30 天，无需信用卡。我们的专家团队随时为您服务。',
    'cta.trial': '免费试用',
    'cta.contact': '联系我们',
    
    // 定价
    'pricing.badge': '💎 简单透明 · 无隐藏费用',
    'pricing.title': '选择适合你的方案',
    'pricing.subtitle': '灵活定价，满足个人开发者到大型企业的所有需求',
    'pricing.personal.name': '个人版',
    'pricing.personal.price': '免费',
    'pricing.personal.desc': '适合个人开发者和小团队',
    'pricing.pro.name': '企业版',
    'pricing.pro.price': '¥999',
    'pricing.pro.price.period': '/年起',
    'pricing.pro.desc': '适合中大型企业和团队',
    'pricing.pro.badge': '🔥 最受欢迎',
    'pricing.enterprise.name': '定制版',
    'pricing.enterprise.price': '面议',
    'pricing.enterprise.desc': '超大规模企业定制方案',
    'pricing.contact.sales': '联系销售',
    'pricing.contact.deal': '联系洽谈',
    'pricing.compare.title': '功能详细对比',
    'pricing.compare.feature': '功能特性',
    'pricing.compare.personal': '个人版',
    'pricing.compare.pro': '企业版',
    'pricing.compare.enterprise': '定制版',
    'pricing.contact.title': '联系销售团队',
    'pricing.contact.subtitle': '填写以下信息，我们的销售专家会在 24 小时内与您联系，提供免费咨询和演示',
    'pricing.form.name': '姓名',
    'pricing.form.company': '公司名称',
    'pricing.form.email': '工作邮箱',
    'pricing.form.phone': '联系电话',
    'pricing.form.product': '感兴趣的产品',
    'pricing.form.team': '团队规模',
    'pricing.form.message': '具体需求',
    'pricing.form.submit': '提交咨询',
    
    // 页脚
    'footer.subtitle': '智能 IT 管理平台，让 IT 管理更简单高效',
    'footer.products': '产品',
    'footer.opensource': '开源',
    'footer.contact': '联系',
    
    // 语言切换
    'lang.zh': '中文',
    'lang.en': 'English',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.opensource': 'Open Source',
    'nav.blog': 'Blog',
    'nav.pricing': 'Pricing',
    'nav.docs': 'Docs',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.trial': 'Free Trial',
    
    // Products
    'product.openclaw': 'OpenClaw',
    'product.openclaw.desc': 'AI-Driven One-Person DevOps Team',
    'product.itsm': 'ITSM',
    'product.itsm.desc': 'Enterprise IT Service Management',
    'product.config': 'Config Generator',
    'product.config.desc': 'Setup OpenClaw in 3 Minutes',
    'product.config.badge': 'Free',
    
    // Home
    'home.hero.badge': 'AI-Driven DevOps Platform',
    'home.hero.title1': 'Make IT Management',
    'home.hero.title1.highlight': 'Simpler',
    'home.hero.title2': 'Make Business Operations',
    'home.hero.title2.highlight': 'More Efficient',
    'home.hero.subtitle': 'CloudMesh provides a complete IT management platform, from deployment to operations, from tickets to knowledge base, one-stop solution for enterprise IT management needs',
    'home.hero.trial': 'Start Free Trial',
    'home.hero.learn': 'Learn More',
    
    // Features
    'features.title': 'Core Advantages',
    'features.subtitle': 'Why Choose CloudMesh',
    'features.ai.title': 'AI-Powered',
    'features.ai.desc': 'AI-driven automation and intelligent analysis, anomaly detection, root cause analysis, performance optimization suggestions',
    'features.fast.title': 'Fast Deployment',
    'features.fast.desc': 'Minute-level deployment, one-click deploy, blue-green release, canary release, no complex configuration',
    'features.secure.title': 'Secure & Reliable',
    'features.secure.desc': 'Enterprise-grade security, encrypted data transmission, access control, audit logs, 99.9% availability',
    'features.data.title': 'Data-Driven',
    'features.data.desc': 'Multi-dimensional analytics, visual dashboards, capacity forecasting, cost optimization',
    'features.flexible.title': 'Flexible Scaling',
    'features.flexible.desc': 'Modular design, choose as needed, support private deployment, open API integration',
    'features.support.title': 'Professional Support',
    'features.support.desc': '7x24 technical support, professional team, knowledge base, community, fast response',
    
    // Skills
    'skills.title': '🧩 Skill Market',
    'skills.subtitle': 'Extend Your AI Assistant Like Installing Apps',
    'skills.view.all': 'View All Skills',
    'skills.guide': 'User Guide',
    
    // CTA
    'cta.title': 'Ready to Get Started?',
    'cta.subtitle': 'Start your 30-day free trial now, no credit card required. Our expert team is ready to help.',
    'cta.trial': 'Free Trial',
    'cta.contact': 'Contact Us',
    
    // Pricing
    'pricing.badge': '💎 Simple & Transparent · No Hidden Fees',
    'pricing.title': 'Choose Your Plan',
    'pricing.subtitle': 'Flexible pricing for individuals to enterprises',
    'pricing.personal.name': 'Personal',
    'pricing.personal.price': 'Free',
    'pricing.personal.desc': 'For individual developers and small teams',
    'pricing.pro.name': 'Business',
    'pricing.pro.price': '$149',
    'pricing.pro.price.period': '/year',
    'pricing.pro.desc': 'For medium to large enterprises',
    'pricing.pro.badge': '🔥 Most Popular',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Contact Us',
    'pricing.enterprise.desc': 'Custom solutions for large enterprises',
    'pricing.contact.sales': 'Contact Sales',
    'pricing.contact.deal': 'Contact Us',
    'pricing.compare.title': 'Feature Comparison',
    'pricing.compare.feature': 'Features',
    'pricing.compare.personal': 'Personal',
    'pricing.compare.pro': 'Business',
    'pricing.compare.enterprise': 'Enterprise',
    'pricing.contact.title': 'Contact Sales Team',
    'pricing.contact.subtitle': 'Fill in the form below, our sales experts will contact you within 24 hours',
    'pricing.form.name': 'Name',
    'pricing.form.company': 'Company',
    'pricing.form.email': 'Work Email',
    'pricing.form.phone': 'Phone Number',
    'pricing.form.product': 'Interested Product',
    'pricing.form.team': 'Team Size',
    'pricing.form.message': 'Requirements',
    'pricing.form.submit': 'Submit',
    
    // Footer
    'footer.subtitle': 'Intelligent IT Management Platform',
    'footer.products': 'Products',
    'footer.opensource': 'Open Source',
    'footer.contact': 'Contact',
    
    // Language
    'lang.zh': '中文',
    'lang.en': 'English',
  }
};

// 当前语言
let currentLang = 'zh';

/**
 * 检测用户语言
 * 优先级：URL 参数 > localStorage > 浏览器设置 > IP 地理位置
 */
function detectLanguage() {
  // 1. URL 参数
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && (langParam === 'zh' || langParam === 'en')) {
    return langParam;
  }
  
  // 2. localStorage
  const savedLang = localStorage.getItem('cloudmesh_lang');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    return savedLang;
  }
  
  // 3. 浏览器设置
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }
  
  // 4. 默认为英文（海外用户）
  return 'en';
}

/**
 * 切换语言
 */
function switchLanguage(lang) {
  if (!i18n[lang]) return;
  
  currentLang = lang;
  localStorage.setItem('cloudmesh_lang', lang);
  
  // 更新所有带有 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (i18n[lang][key]) {
      element.textContent = i18n[lang][key];
    }
  });
  
  // 更新 HTML lang 属性
  document.documentElement.lang = lang;
  
  // 更新语言切换按钮
  updateLangSwitcher();
}

/**
 * 更新语言切换按钮显示
 */
function updateLangSwitcher() {
  const langSwitchers = document.querySelectorAll('[data-lang-switcher]');
  langSwitchers.forEach(switcher => {
    const lang = switcher.getAttribute('data-lang-switcher');
    if (lang === currentLang) {
      switcher.classList.add('active');
    } else {
      switcher.classList.remove('active');
    }
  });
}

/**
 * 初始化国际化
 */
function initI18n() {
  const lang = detectLanguage();
  switchLanguage(lang);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initI18n);

// 导出函数
window.i18n = i18n;
window.switchLanguage = switchLanguage;
window.detectLanguage = detectLanguage;
