/**
 * 沈浪调研报告 - 交互脚本
 * 版本: 2.0.0
 * 
 * 包含章节折叠、Tab切换等交互功能
 */

// ==================== 章节折叠/展开 ====================
function toggleSection(header) {
    const content = header.nextElementSibling;
    header.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
}

// ==================== Tab切换 ====================
function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabsContainer => {
        const tabs = tabsContainer.querySelectorAll('.tab');
        const sectionCard = tabsContainer.closest('.section-card');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // 移除所有tab的active状态
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 隐藏所有tab内容
                sectionCard.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // 显示对应的tab内容
                const targetContent = sectionCard.querySelector('#' + tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    });
}

// ==================== 平滑滚动到锚点 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== 目录高亮 ====================
function initTocHighlight() {
    const tocItems = document.querySelectorAll('.toc-item');
    const sections = document.querySelectorAll('.section-card[id]');
    
    if (tocItems.length === 0 || sections.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // 移除所有高亮
                tocItems.forEach(item => item.classList.remove('active'));
                
                // 添加当前章节高亮
                const activeItem = document.querySelector(`.toc-item[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// ==================== 表格行高亮 ====================
function initTableHover() {
    document.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('highlight')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// ==================== 统计卡片动画 ====================
function initStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.4s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ==================== 返回顶部按钮 ====================
function initBackToTop() {
    // 创建按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1A7F37 0%, #2DA44E 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(26, 127, 55, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 悬停效果
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1)';
    });
}

// ==================== 打印优化 ====================
function initPrintSupport() {
    // 打印时展开所有折叠的章节
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.section-header.collapsed').forEach(header => {
            header.classList.remove('collapsed');
            header.nextElementSibling.classList.remove('collapsed');
        });
        
        // 显示所有tab内容
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'block';
        });
    });
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initSmoothScroll();
    initSidebar();
    initTocHighlight();
    initTableHover();
    initStatCards();
    initBackToTop();
    initPrintSupport();
    
    console.log('📊 沈浪调研报告 - 交互脚本已加载');
});

// ==================== 侧边栏导航（悬浮式） ====================
function initSidebar() {
    const sidebar = document.getElementById('sidebar-nav');
    const openBtn = document.getElementById('sidebar-open-btn');
    
    if (!sidebar) return;
    
    // 创建遮罩层（仅移动端使用）
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.onclick = () => toggleSidebar();
    document.body.appendChild(overlay);
    
    // 判断是否为大屏幕（悬浮显示，不影响主内容）
    const isLargeScreen = window.innerWidth > 1200;
    
    if (isLargeScreen) {
        document.body.classList.add('sidebar-open');
        // 大屏幕下侧边栏默认显示
    } else {
        openBtn.classList.add('visible');
        sidebar.classList.add('collapsed');
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        const isNowLarge = window.innerWidth > 1200;
        if (isNowLarge) {
            sidebar.classList.remove('expanded', 'collapsed');
            overlay.classList.remove('visible');
            document.body.classList.add('sidebar-open');
            openBtn.classList.remove('visible');
        } else {
            document.body.classList.remove('sidebar-open');
            openBtn.classList.add('visible');
            if (!sidebar.classList.contains('expanded')) {
                sidebar.classList.add('collapsed');
            }
        }
    });
    
    // 点击目录项后，移动端自动收起侧边栏
    sidebar.querySelectorAll('.toc-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 1200) {
                sidebar.classList.remove('expanded');
                sidebar.classList.add('collapsed');
                overlay.classList.remove('visible');
            }
        });
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar-nav');
    const openBtn = document.getElementById('sidebar-open-btn');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!sidebar) return;
    
    const isExpanded = sidebar.classList.contains('expanded');
    
    if (isExpanded) {
        sidebar.classList.remove('expanded');
        sidebar.classList.add('collapsed');
        overlay?.classList.remove('visible');
    } else {
        sidebar.classList.remove('collapsed');
        sidebar.classList.add('expanded');
        overlay?.classList.add('visible');
    }
}
