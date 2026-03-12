/**
 * CloudMesh 自动语言检测与重定向
 * 根据用户浏览器语言设置自动跳转到对应语言版本
 */

(function() {
  // 获取用户语言偏好
  function getUserLanguage() {
    // 1. 检查 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) {
      return langParam;
    }
    
    // 2. 检查 localStorage
    const savedLang = localStorage.getItem('cloudmesh_lang');
    if (savedLang) {
      return savedLang;
    }
    
    // 3. 检查浏览器设置
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 如果是中文（包括 zh-CN, zh-TW, zh-HK 等）
    if (browserLang && browserLang.toLowerCase().startsWith('zh')) {
      return 'zh';
    }
    
    // 其他语言默认英文
    return 'en';
  }
  
  // 检查当前页面语言
  function getCurrentPageLang() {
    const path = window.location.pathname;
    
    // 英文页面
    if (path.includes('.en.html') || path.includes('/en/')) {
      return 'en';
    }
    
    // 默认中文
    return 'zh';
  }
  
  // 执行重定向
  function redirectIfNeeded() {
    const userLang = getUserLanguage();
    const pageLang = getCurrentPageLang();
    
    // 如果用户语言和页面语言不匹配
    if (userLang !== pageLang) {
      const currentPath = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;
      
      let newPath;
      
      if (userLang === 'en') {
        // 跳转到英文页面
        if (currentPath === '/' || currentPath === '/index.html') {
          newPath = '/index.en.html';
        } else if (!currentPath.includes('.en.html')) {
          // 其他页面，添加 .en 后缀
          newPath = currentPath.replace('.html', '.en.html');
        }
      } else {
        // 跳转到中文页面
        if (currentPath.includes('.en.html')) {
          newPath = currentPath.replace('.en.html', '.html');
        }
      }
      
      if (newPath && newPath !== currentPath) {
        // 保存用户偏好
        localStorage.setItem('cloudmesh_lang', userLang);
        
        // 执行跳转
        window.location.href = newPath + search + hash;
      }
    }
  }
  
  // 页面加载时执行
  // 注意：为了避免影响 SEO，我们只在用户明确访问首页时进行重定向
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    // 延迟执行，避免影响页面加载
    setTimeout(redirectIfNeeded, 100);
  }
  
  // 导出函数供手动切换使用
  window.switchLanguage = function(lang) {
    localStorage.setItem('cloudmesh_lang', lang);
    
    const currentPath = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;
    
    let newPath;
    
    if (lang === 'en') {
      if (currentPath === '/' || currentPath === '/index.html') {
        newPath = '/index.en.html';
      } else {
        newPath = currentPath.replace('.html', '.en.html');
      }
    } else {
      if (currentPath.includes('.en.html')) {
        newPath = currentPath.replace('.en.html', '.html');
      } else {
        newPath = currentPath;
      }
    }
    
    if (newPath && newPath !== currentPath) {
      window.location.href = newPath + search + hash;
    }
  };
})();
