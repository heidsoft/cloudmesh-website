/**
 * CloudMesh 主题切换功能
 * 架构方案：
 * 1. CSS 变量管理主题色
 * 2. localStorage 存储 theme 键
 * 3. 在 <head> 最早处加载避免 FOUC
 */
(function() {
    'use strict';

    const THEME_KEY = 'theme';
    const THEMES = {
        light: {
            name: '浅色',
            icon: '☀️'
        },
        dark: {
            name: '深色',
            icon: '🌙'
        }
    };

    // 获取当前主题
    function getTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;
        
        // 检测系统偏好
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // 应用主题
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        
        // 触发自定义事件，让其他组件可以响应
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    // 初始化主题
    function init() {
        const theme = getTheme();
        applyTheme(theme);
        
        // 监听系统主题变化
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    // 切换主题
    window.toggleTheme = function() {
        const current = getTheme();
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        updateButton();
    };

    // 获取主题信息
    window.getThemeInfo = function() {
        const theme = getTheme();
        return {
            theme: theme,
            name: THEMES[theme].name,
            icon: THEMES[theme].icon
        };
    };

    // 更新按钮状态（如果页面上已有按钮）
    function updateButton() {
        const btn = document.querySelector('[data-theme-toggle]');
        if (btn) {
            const info = window.getThemeInfo();
            const iconEl = btn.querySelector('.theme-icon');
            if (iconEl) {
                iconEl.textContent = info.icon;
            }
            btn.title = info.name + '模式';
        }
    }

    // 监听主题变化事件
    window.addEventListener('themechange', function() {
        updateButton();
    });

    // 页面加载完成后初始化按钮
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateButton);
    } else {
        updateButton();
    }

    // 立即执行初始化
    init();
})();