// Web Notes 博客脚本

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // 点击其他区域关闭菜单
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && !event.target.closest('.menu-toggle') && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// 文章列表加载
async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        renderPosts(data);
        renderCategories(data);
        renderTags(data);
    } catch (error) {
        console.error('Error loading posts:', error);
        document.querySelector('.post-list').innerHTML = '<p>加载文章失败，请稍后再试。</p>';
    }
}

// 渲染文章列表
function renderPosts(posts) {
    const postList = document.querySelector('.post-list');
    if (!postList) return;

    // 按日期排序（最新的在前面）
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 渲染文章列表
    let html = '';
    posts.forEach(post => {
        html += `
            <div class="post-item">
                <h2 class="post-title">
                    <a href="post.html?id=${post.id}">${post.title}</a>
                </h2>
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-category">分类: ${post.categories.join(', ')}</span>
                </div>
                <div class="post-excerpt">${post.excerpt || '暂无摘要'}</div>
                <a href="post.html?id=${post.id}" class="read-more">阅读全文</a>
            </div>
        `;
    });

    postList.innerHTML = html;
}

// 渲染分类
function renderCategories(posts) {
    const categoriesWidget = document.querySelector('.categories-list');
    if (!categoriesWidget) return;

    // 统计分类及其文章数量
    const categories = {};
    posts.forEach(post => {
        post.categories.forEach(category => {
            if (!categories[category]) {
                categories[category] = 0;
            }
            categories[category]++;
        });
    });

    // 渲染分类列表
    let html = '<ul>';
    Object.keys(categories).sort().forEach(category => {
        html += `<li><a href="category.html?name=${encodeURIComponent(category)}">${category} (${categories[category]})</a></li>`;
    });
    html += '</ul>';

    categoriesWidget.innerHTML = html;
}

// 渲染标签云
function renderTags(posts) {
    const tagsWidget = document.querySelector('.tag-cloud');
    if (!tagsWidget) return;

    // 统计标签及其文章数量
    const tags = {};
    posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => {
                if (!tags[tag]) {
                    tags[tag] = 0;
                }
                tags[tag]++;
            });
        }
    });

    // 渲染标签云
    let html = '';
    Object.keys(tags).sort().forEach(tag => {
        html += `<a href="tag.html?name=${encodeURIComponent(tag)}">${tag} (${tags[tag]})</a>`;
    });

    tagsWidget.innerHTML = html;
}

// 日期格式化
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 加载单篇文章
async function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`posts/${postId}.md`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }

        const markdown = await response.text();
        
        // 解析 frontmatter
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
        const frontMatterMatch = markdown.match(frontMatterRegex);
        
        let frontMatter = {};
        let content = markdown;
        
        if (frontMatterMatch) {
            const frontMatterText = frontMatterMatch[1];
            frontMatterText.split('\n').forEach(line => {
                if (line.trim() && line.includes(':')) {
                    const [key, ...valueParts] = line.split(':');
                    let value = valueParts.join(':').trim();
                    
                    // 处理数组类型的值
                    if (value.startsWith('- ')) {
                        value = value.substring(2).split(', ');
                    }
                    
                    frontMatter[key.trim()] = value;
                }
            });
            
            content = markdown.substring(frontMatterMatch[0].length);
        }
        
        // 渲染文章
        renderPostContent(frontMatter, content);
        
    } catch (error) {
        console.error('Error loading post:', error);
        document.querySelector('.post-content').innerHTML = '<p>加载文章失败，请稍后再试。</p>';
    }
}

// 渲染文章内容
function renderPostContent(frontMatter, markdown) {
    const postTitle = document.querySelector('.post-title');
    const postMeta = document.querySelector('.post-meta');
    const postContent = document.querySelector('.post-content');
    
    if (postTitle) {
        postTitle.textContent = frontMatter.title || '无标题';
    }
    
    if (postMeta) {
        let metaHtml = '';
        
        if (frontMatter.date) {
            metaHtml += `<span class="post-date">发布时间：${formatDate(frontMatter.date)}</span>`;
        }
        
        if (frontMatter.categories) {
            const categories = Array.isArray(frontMatter.categories) 
                ? frontMatter.categories 
                : [frontMatter.categories];
            
            metaHtml += `<span class="post-category">分类：${categories.join(', ')}</span>`;
        }
        
        postMeta.innerHTML = metaHtml;
    }
    
    if (postContent) {
        // 这里需要引入一个 Markdown 解析库，例如 marked.js
        // 为了简化示例，这里使用一个极简的 Markdown 解析函数
        postContent.innerHTML = simpleMarkdownToHtml(markdown);
    }
}

// 极简 Markdown 解析（实际项目中应使用成熟的库如 marked.js）
function simpleMarkdownToHtml(markdown) {
    let html = markdown;
    
    // 处理标题
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // 处理粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 处理斜体
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 处理代码块
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // 处理行内代码
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // 处理链接
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // 处理图片
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    
    // 处理段落
    html = html.split('\n\n').map(paragraph => {
        if (
            !paragraph.startsWith('<h1>') && 
            !paragraph.startsWith('<h2>') && 
            !paragraph.startsWith('<h3>') && 
            !paragraph.startsWith('<pre>') &&
            paragraph.trim() !== ''
        ) {
            return `<p>${paragraph}</p>`;
        }
        return paragraph;
    }).join('\n\n');
    
    return html;
} 