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
    
    // 检查是否在本地运行
    if (window.location.protocol === 'file:') {
        console.log('检测到本地文件系统模式，将使用fallback数据');
    }
});

// 检测是否是本地文件系统模式
function isLocalFileSystem() {
    return window.location.protocol === 'file:';
}

// 本地环境的后备文章数据
const fallbackPostsData = [
    {
        "id": "web-notes-update",
        "title": "Web Notes更新日志",
        "date": "2024-07-12",
        "categories": [
            "我的作品"
        ],
        "tags": [
            "更新日志",
            "web_notes",
            "静态博客"
        ],
        "excerpt": "【置顶】Web Notes更新日志，持续更新  本页更新日志说明：所有更新日志将集中在本文，持续更新。"
    },
    {
        "id": "markdown-guide",
        "title": "Markdown使用指南",
        "date": "2024-07-11",
        "categories": [
            "我的作品"
        ],
        "tags": [
            "Markdown",
            "教程"
        ],
        "excerpt": "Markdown是一种轻量级标记语言，创建于2004年，现在已经成为世界上最流行的标记语言之一。"
    },
    {
        "id": "hello-world",
        "title": "Hello World",
        "date": "2024-07-10",
        "categories": [
            "其他分享"
        ],
        "tags": [
            "静态博客",
            "web_notes"
        ],
        "excerpt": "这是我的第一篇博客文章，使用Markdown格式编写。"
    },
    {
        "id": "personal-rss",
        "title": "RSS FEEDS 个人的优质收藏",
        "date": "2023-07-15",
        "categories": [
            "Rss"
        ],
        "tags": [
            "Rss",
            "Feeds"
        ],
        "excerpt": "RSS（Really Simple Syndication）是一种用来发布经常更新内容的格式，允许用户订阅自己感兴趣的内容源。以下是我收集的一些优质RSS Feeds，希望对你有所帮助。"
    }
];

// 本地环境文章内容备份
const fallbackPostsContent = {
    'hello-world': `---
title: Hello World
date: 2024-07-10
categories: 
  - 其他分享
tags:
  - 静态博客
  - web_notes
---

## Hello World

这是我的第一篇博客文章，使用Markdown格式编写。

静态博客的好处：

1. 无需数据库，全静态文件
2. 加载速度快
3. 部署简单
4. 安全性高

\`\`\`js
// 这是一段示例代码
console.log("Hello, Web Notes!");
\`\`\`

希望这个博客系统能够为你带来便利！`,
    'markdown-guide': `---
title: Markdown使用指南
date: 2024-07-11
categories: 
  - 我的作品
tags:
  - Markdown
  - 教程
---

## Markdown使用指南

Markdown是一种轻量级标记语言，创建于2004年，现在已经成为世界上最流行的标记语言之一。

### 基础语法

#### 标题

使用\`#\`符号表示标题，一级标题使用一个\`#\`，二级标题使用两个\`#\`，以此类推。

\`\`\`
# 一级标题
## 二级标题
### 三级标题
\`\`\`

#### 强调

*斜体* 使用 \`*斜体*\`
**粗体** 使用 \`**粗体**\`
***粗斜体*** 使用 \`***粗斜体***\`

#### 列表

无序列表使用星号、加号或减号作为列表项的标记：

\`\`\`
* 第一项
* 第二项
* 第三项
\`\`\`

有序列表使用数字并加上\`.\`号：

\`\`\`
1. 第一项
2. 第二项
3. 第三项
\`\`\`

### 高级语法

#### 链接

\`\`\`
[链接文字](链接地址)
\`\`\`

#### 图片

\`\`\`
![替代文字](图片地址)
\`\`\`

希望这篇指南对你有所帮助！`,
    'web-notes-update': `---
title: Web Notes更新日志
date: 2024-07-12
categories: 
  - 我的作品
tags:
  - 更新日志
  - web_notes
  - 静态博客
---

## 【置顶】Web Notes更新日志，持续更新

本页更新日志说明：所有更新日志将集中在本文，持续更新。

### 2024-07-12更新日志

1. 创建了基础博客框架
2. 添加了Markdown解析功能
3. 支持文章分类和标签功能
4. 优化了移动端显示效果

### 计划中的功能

- [ ] 搜索功能
- [ ] 评论系统
- [ ] 暗黑模式
- [ ] 文章目录自动生成

感谢使用Web Notes静态博客系统！`,
    'personal-rss': `---
title: RSS FEEDS 个人的优质收藏
date: 2023-07-15
categories: 
  - Rss
tags:
  - Rss
  - Feeds
---

## RSS FEEDS 个人的优质收藏

RSS（Really Simple Syndication）是一种用来发布经常更新内容的格式，允许用户订阅自己感兴趣的内容源。以下是我收集的一些优质RSS Feeds，希望对你有所帮助。

### 1. 科技媒体

* [少数派](https://sspai.com/feed) - 优质数字生活指南
* [36氪](https://36kr.com/feed) - 中国创业互联网媒体
* [爱范儿](https://www.ifanr.com/feed) - 关注科技、生活方式的媒体

### 2. 技术类

* [阮一峰的网络日志](http://www.ruanyifeng.com/blog/atom.xml) - 知名技术博主，Web技术介绍
* [酷壳](https://coolshell.cn/feed) - 陈皓的技术博客，分享技术见解
* [InfoQ](https://feed.infoq.com) - 软件开发新闻、文章和视频
* [Hacker News](https://news.ycombinator.com/rss) - 编程和创业领域的热门新闻

### 3. 个人博客

* [月光博客](https://www.williamlong.info/rss.xml) - 关注互联网和搜索引擎的IT博客
* [张鑫旭的博客](https://www.zhangxinxu.com/wordpress/feed/) - 前端技术博客

### 如何使用RSS

1. 选择一个RSS阅读器，如Feedly、Inoreader或NewsBlur
2. 将上述RSS链接添加到你的阅读器中
3. 定期查看更新，获取最新内容

希望这些RSS源能够帮助你获取有价值的信息！`
};

// 文章列表加载
async function loadPosts() {
    console.log('开始加载文章数据...');
    
    // 如果是本地文件系统模式，直接使用内置数据
    if (isLocalFileSystem()) {
        console.log('本地文件系统模式，使用内置fallback数据');
        return fallbackPostsData;
    }
    
    try {
        // 尝试从缓存加载文章列表
        const cachedPosts = localStorage.getItem('webnotes_posts_cache');
        const cacheTime = localStorage.getItem('webnotes_posts_cache_time');
        
        if (cachedPosts && cacheTime) {
            const posts = JSON.parse(cachedPosts);
            const cacheAge = (new Date().getTime() - parseInt(cacheTime)) / (1000 * 60); // 缓存时间（分钟）
            
            if (cacheAge < 60) { // 缓存不超过60分钟
                console.log(`使用缓存的文章数据（${cacheAge.toFixed(2)}分钟前）`);
                return posts;
            }
        }
        
        console.log('尝试从服务器加载文章数据：posts.json');
        const response = await fetch('posts.json');
        
        if (!response.ok) {
            console.error(`加载文章列表失败: HTTP ${response.status} - ${response.statusText}`);
            throw new Error(`加载文章列表失败: HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log(`成功加载文章数据，共${data.length}篇文章`);
        
        // 缓存文章数据到localStorage
        try {
            localStorage.setItem('webnotes_posts_cache', JSON.stringify(data));
            localStorage.setItem('webnotes_posts_cache_time', new Date().getTime());
            console.log('文章数据已缓存到localStorage');
        } catch (e) {
            console.warn('无法缓存文章数据到localStorage:', e);
        }
        
        return data;
    } catch (error) {
        console.error('Error loading posts:', error);
        
        // 如果有缓存，尽管已过期，仍然使用
        const cachedPosts = localStorage.getItem('webnotes_posts_cache');
        if (cachedPosts) {
            console.log('使用过期的缓存数据');
            return JSON.parse(cachedPosts);
        }
        
        // 如果没有缓存，尝试使用内置数据
        console.log('使用内置fallback数据作为最后的备选方案');
        return fallbackPostsData;
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

// 渲染近期文章函数
function renderRecentPosts(posts) {
    const recentPosts = document.querySelector('.recent-posts');
    if (recentPosts) {
        let html = '<ul>';
        posts.slice(0, 5).forEach(post => {
            html += `<li><a href="post.html?id=${post.id}">${post.title}</a></li>`;
        });
        html += '</ul>';
        recentPosts.innerHTML = html;
    }
}

// 加载单篇文章
async function loadPost(postId) {
    console.log(`开始加载文章: ${postId}...`);
    
    // 如果是本地文件系统模式，直接使用内置数据
    if (isLocalFileSystem()) {
        console.log('本地文件系统模式，使用内置文章内容');
        if (fallbackPostsContent[postId]) {
            return fallbackPostsContent[postId];
        } else {
            console.error(`本地模式下未找到文章: ${postId}`);
            throw new Error(`本地模式下未找到文章: ${postId}`);
        }
    }

    if (!postId) {
        console.error('未指定文章ID');
        throw new Error('未指定文章ID');
    }

    try {
        // 尝试从缓存加载文章内容
        const cachedContent = localStorage.getItem(`webnotes_post_${postId}`);
        const cacheTime = localStorage.getItem(`webnotes_post_${postId}_time`);
        
        if (cachedContent && cacheTime) {
            const cacheAge = (new Date().getTime() - parseInt(cacheTime)) / (1000 * 60 * 60); // 小时
            
            // 如果缓存不超过24小时，直接使用缓存
            if (cacheAge < 24) {
                console.log(`使用缓存的文章内容（${cacheAge.toFixed(2)}小时前）`);
                return cachedContent;
            }
        }
        
        // 构建文章URL
        const articleUrl = `posts/${postId}.md`;
        console.log(`尝试从服务器加载文章: ${articleUrl}`);
        
        // 添加时间戳参数防止缓存
        const timestamp = new Date().getTime();
        const urlWithTimestamp = `${articleUrl}?t=${timestamp}`;
        
        // 使用更详细的fetch选项
        const response = await fetch(urlWithTimestamp, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain, text/markdown, */*',
                'Cache-Control': 'no-cache'
            },
            mode: 'cors',
            cache: 'no-store'
        });
        
        if (!response.ok) {
            console.error(`加载文章失败: HTTP ${response.status} - ${response.statusText}`);
            console.error(`文章URL: ${urlWithTimestamp}`);
            console.error(`响应类型: ${response.type}`);
            console.error(`响应头: `, Object.fromEntries([...response.headers]));
            throw new Error(`文章加载失败(HTTP ${response.status}): ${response.statusText}`);
        }

        const markdown = await response.text();
        console.log(`成功加载文章: ${postId} (${markdown.length} 字节)`);
        
        if (markdown.trim().length === 0) {
            throw new Error(`文章内容为空: ${postId}`);
        }
        
        if (!markdown.includes('---')) {
            console.warn(`警告: 文章可能缺少frontmatter: ${postId}`);
        }
        
        // 缓存文章内容
        try {
            localStorage.setItem(`webnotes_post_${postId}`, markdown);
            localStorage.setItem(`webnotes_post_${postId}_time`, new Date().getTime());
            console.log('文章内容已缓存到localStorage');
        } catch (e) {
            console.warn('无法缓存文章内容:', e);
        }
        
        return markdown;
    } catch (error) {
        console.error(`加载文章 ${postId} 时出错:`, error);
        
        // 尝试从缓存加载文章内容，即使已过期
        const cachedContent = localStorage.getItem(`webnotes_post_${postId}`);
        if (cachedContent) {
            console.log('使用过期的缓存文章内容');
            return cachedContent;
        }
        
        // 如果没有缓存，尝试使用内置数据
        if (fallbackPostsContent[postId]) {
            console.log(`使用内置文章内容: ${postId}`);
            return fallbackPostsContent[postId];
        }

        // 添加服务器环境检测的错误信息
        const errorDetails = `
            尝试访问: posts/${postId}.md
            当前URL: ${window.location.href}
            协议: ${window.location.protocol}
            主机: ${window.location.host}
        `;
        console.error(errorDetails);
        
        throw new Error(`无法加载文章(${error.message}). 请确保服务器配置正确且文件存在`);
    }
}

// 解析 frontmatter
function parseFrontmatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const frontMatterMatch = content.match(frontMatterRegex);
    
    let frontMatter = {};
    let contentText = content;
    
    if (frontMatterMatch) {
        const frontMatterText = frontMatterMatch[1];
        const lines = frontMatterText.split('\n');
        
        lines.forEach(line => {
            if (line.trim() && line.includes(':')) {
                const colonIndex = line.indexOf(':');
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                if (key === 'categories' || key === 'tags') {
                    // 解析 YAML 风格的数组
                    const arrayRegex = /\s*-\s+(.+)/g;
                    const values = [];
                    let match;
                    
                    while ((match = arrayRegex.exec(value)) !== null) {
                        values.push(match[1]);
                    }
                    
                    if (values.length > 0) {
                        frontMatter[key] = values;
                    }
                } else {
                    frontMatter[key] = value;
                }
            }
        });
        
        contentText = content.substring(frontMatterMatch[0].length);
    }
    
    return {
        frontMatter,
        content: contentText
    };
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
            
            metaHtml += `<span class="post-category">分类：`;
            categories.forEach((category, index) => {
                metaHtml += `<a href="category.html?name=${encodeURIComponent(category)}">${category}</a>`;
                if (index < categories.length - 1) {
                    metaHtml += ', ';
                }
            });
            metaHtml += `</span>`;
        }
        
        if (frontMatter.tags && frontMatter.tags.length) {
            metaHtml += `<span class="post-tags">标签：`;
            frontMatter.tags.forEach((tag, index) => {
                metaHtml += `<a href="tag.html?name=${encodeURIComponent(tag)}">${tag}</a>`;
                if (index < frontMatter.tags.length - 1) {
                    metaHtml += ', ';
                }
            });
            metaHtml += `</span>`;
        }
        
        postMeta.innerHTML = metaHtml;
    }
    
    if (postContent) {
        // 优先使用 marked.js 解析 Markdown
        if (typeof marked !== 'undefined') {
            postContent.innerHTML = marked.parse(markdown);
        } else {
            // 如果 marked.js 未加载，使用简单解析
            postContent.innerHTML = simpleMarkdownToHtml(markdown);
        }
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