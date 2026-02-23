/**
 * 沈浪调研报告风格 - 交互逻辑
 * 版本: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initSectionToggle();
    initExpandables();
    initSmoothScroll();
});

/**
 * Tab 切换功能
 */
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const contentId = this.getAttribute('data-tab');
            if (!contentId) return;
            
            // 找到父容器
            const tabsContainer = this.closest('.tabs');
            const sectionCard = this.closest('.section-card') || this.closest('.section-content');
            
            if (!tabsContainer || !sectionCard) return;
            
            // 更新 tab 状态
            tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容状态
            sectionCard.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const targetContent = document.getElementById(contentId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * 全局 switchTab 函数（向后兼容）
 */
function switchTab(tab, contentId) {
    // 找到父容器
    const tabsContainer = tab.closest('.tabs');
    const sectionCard = tab.closest('.section-card') || tab.closest('.section-content');
    
    if (!tabsContainer || !sectionCard) return;
    
    // 更新 tab 状态
    tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // 更新内容状态
    sectionCard.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const targetContent = document.getElementById(contentId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

/**
 * 章节折叠/展开
 */
function initSectionToggle() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (!content || !content.classList.contains('section-content')) return;
            
            this.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
        });
    });
}

/**
 * 全局 toggleCard 函数（向后兼容）
 */
function toggleCard(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    
    header.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
}

/**
 * 可折叠区域
 */
function initExpandables() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (!content || !content.classList.contains('expandable-content')) return;
            
            const toggle = this.querySelector('.toggle');
            if (toggle) {
                toggle.style.transform = content.classList.contains('active') ? 'rotate(0deg)' : 'rotate(180deg)';
            }
            content.classList.toggle('active');
        });
    });
}

/**
 * 全局 toggleExpand 函数（向后兼容）
 */
function toggleExpand(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    
    const toggle = header.querySelector('.toggle');
    if (toggle) {
        toggle.style.transform = content.classList.contains('active') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
    content.classList.toggle('active');
}

/**
 * 平滑滚动到锚点
 */
function initSmoothScroll() {
    const tocLinks = document.querySelectorAll('.toc-item');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // 如果目标章节是折叠的，先展开
                    const content = target.querySelector('.section-content');
                    const header = target.querySelector('.section-header');
                    if (content && content.classList.contains('collapsed')) {
                        header.classList.remove('collapsed');
                        content.classList.remove('collapsed');
                    }
                    
                    // 平滑滚动
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * 滚动时高亮当前章节（可选）
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('.section-card[id]');
    const tocItems = document.querySelectorAll('.toc-item');
    
    if (sections.length === 0 || tocItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}
