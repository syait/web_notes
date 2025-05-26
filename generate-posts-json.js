/**
 * 自动生成 posts.json 文件的脚本
 * 使用方法：node generate-posts-json.js [--clean-cache]
 * 参数说明：
 *   --clean-cache: 清除浏览器缓存的数据（删除posts.json后会自动生成新的）
 * 
 * 需要 Node.js 环境
 */

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const shouldCleanCache = args.includes('--clean-cache');

// 配置
const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'posts.json');
const cacheHtmlFile = path.join(__dirname, 'cache-cleaner.html');

// 解析 frontmatter
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const frontmatterMatch = content.match(frontmatterRegex);
    
    if (!frontmatterMatch) {
        return null;
    }
    
    const frontmatterText = frontmatterMatch[1];
    const frontmatter = {};
    
    // 解析 YAML 格式的 frontmatter
    const lines = frontmatterText.split('\n');
    let currentKey = null;
    let currentArray = null;
    
    lines.forEach(line => {
        if (!line.trim()) return;
        
        // 检查是否是数组项
        if (line.trim().startsWith('- ')) {
            if (currentArray) {
                currentArray.push(line.trim().substring(2));
            }
            return;
        }
        
        // 检查是否是新的键值对
        if (line.includes(':')) {
            const colonIndex = line.indexOf(':');
            currentKey = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            // 检查是否是数组开始
            if (!value) {
                currentArray = [];
                frontmatter[currentKey] = currentArray;
            } else {
                frontmatter[currentKey] = value;
                currentArray = null;
            }
        }
    });
    
    return {
        frontmatter,
        content: content.substring(frontmatterMatch[0].length),
        excerpt: extractExcerpt(content.substring(frontmatterMatch[0].length))
    };
}

// 提取摘要
function extractExcerpt(content, maxLength = 150) {
    // 移除Markdown标记
    let plainText = content
        .replace(/#+\s+(.*)/g, '$1') // 标题
        .replace(/\*\*(.*?)\*\*/g, '$1') // 粗体
        .replace(/\*(.*?)\*/g, '$1') // 斜体
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 链接
        .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // 图片
        .replace(/`{1,3}([\s\S]*?)`{1,3}/g, '$1') // 代码
        .replace(/\n/g, ' ') // 换行
        .trim();
    
    // 截取指定长度
    if (plainText.length > maxLength) {
        plainText = plainText.substring(0, maxLength) + '...';
    }
    
    return plainText;
}

// 验证日期格式 (YYYY-MM-DD)
function isValidDate(dateString) {
    if (!dateString) return false;
    
    // 检查格式
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return false;
    }
    
    // 检查日期有效性
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false;
    }
    
    // 进一步验证月份和日期
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 月份从0开始
    const day = parseInt(parts[2], 10);
    
    // 创建日期对象，用来验证是否是有效日期
    const validationDate = new Date(year, month, day);
    return validationDate.getFullYear() === year &&
           validationDate.getMonth() === month &&
           validationDate.getDate() === day;
}

// 生成清除缓存的HTML文件
function generateCacheCleaner() {
    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>清除Web Notes缓存</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 {
            color: #333;
        }
        .result {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .empty {
            background-color: #e2e3e5;
            color: #383d41;
            border: 1px solid #d6d8db;
        }
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #0069d9;
        }
        button:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
        }
        .back {
            display: inline-block;
            margin-top: 20px;
            color: #007bff;
            text-decoration: none;
        }
        .back:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Web Notes缓存清理工具</h1>
    
    <p>
        如果您在查看博客时遇到了内容不更新的问题，可能是由于浏览器缓存了旧的数据。
        点击下面的按钮清除Web Notes的缓存数据。
    </p>
    
    <button id="clearCache">清除缓存</button>
    
    <div id="result" class="result" style="display: none;"></div>
    
    <a href="index.html" class="back">返回博客首页</a>
    
    <script>
        document.getElementById('clearCache').addEventListener('click', function() {
            const button = this;
            button.disabled = true;
            
            const resultDiv = document.getElementById('result');
            resultDiv.className = 'result';
            
            let clearedItems = 0;
            
            // 清除所有WebNotes相关的localStorage项
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.startsWith('webnotes_') || key === 'webnotes_posts_cache' || key === 'webnotes_posts_cache_time')) {
                    localStorage.removeItem(key);
                    clearedItems++;
                    i--; // 因为移除了一项，索引需要调整
                }
            }
            
            if (clearedItems > 0) {
                resultDiv.innerHTML = '<p>缓存清除成功！共清除了 ' + clearedItems + ' 项缓存数据。</p><p>请刷新博客页面获取最新内容。</p>';
                resultDiv.classList.add('success');
            } else {
                resultDiv.innerHTML = '<p>没有找到需要清除的缓存数据。</p>';
                resultDiv.classList.add('empty');
            }
            
            resultDiv.style.display = 'block';
            button.disabled = false;
        });
    </script>
</body>
</html>
    `;
    
    try {
        fs.writeFileSync(cacheHtmlFile, htmlContent, 'utf8');
        console.log(`已生成缓存清理工具：${cacheHtmlFile}`);
    } catch (error) {
        console.error(`生成缓存清理工具失败:`, error);
    }
}

// 生成 posts.json
function generatePostsJson() {
    try {
        // 检查 posts 目录是否存在
        if (!fs.existsSync(postsDir)) {
            console.error(`目录不存在: ${postsDir}`);
            return;
        }
        
        // 获取所有 Markdown 文件
        const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
        
        if (files.length === 0) {
            console.log('没有找到 Markdown 文件');
            return;
        }
        
        // 处理每个文件
        const posts = [];
        const errors = [];
        
        files.forEach(file => {
            const filePath = path.join(postsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const parsed = parseFrontmatter(content);
            
            if (!parsed) {
                errors.push(`警告: 无法解析frontmatter: ${file}`);
                return;
            }
            
            const { frontmatter, excerpt } = parsed;
            const id = file.replace(/\.md$/, '');
            
            // 检查必要的字段
            if (!frontmatter.title) {
                errors.push(`错误: 缺少title字段: ${file}`);
                return;
            }
            
            if (!frontmatter.date) {
                errors.push(`错误: 缺少date字段: ${file}`);
                return;
            }
            
            // 验证日期格式
            if (!isValidDate(frontmatter.date)) {
                errors.push(`错误: date字段格式不正确（应为YYYY-MM-DD）: ${file}`);
                return;
            }
            
            // 检查categories和tags
            if (!frontmatter.categories || (Array.isArray(frontmatter.categories) && frontmatter.categories.length === 0)) {
                errors.push(`警告: 缺少categories字段: ${file}`);
                frontmatter.categories = ['未分类'];
            }
            
            if (!frontmatter.tags) {
                frontmatter.tags = [];
            }
            
            posts.push({
                id,
                title: frontmatter.title,
                date: frontmatter.date,
                categories: Array.isArray(frontmatter.categories) ? frontmatter.categories : [frontmatter.categories],
                tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : (frontmatter.tags ? [frontmatter.tags] : []),
                excerpt: excerpt
            });
        });
        
        // 按日期排序（最新的在前面）
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 写入 JSON 文件
        fs.writeFileSync(outputFile, JSON.stringify(posts, null, 4), 'utf8');
        
        console.log(`成功生成 posts.json，共 ${posts.length} 篇文章`);
        
        // 如果有错误，输出错误信息
        if (errors.length > 0) {
            console.log('\n发现以下问题:');
            errors.forEach(error => console.log('- ' + error));
        }
        
        // 如果指定了清除缓存参数，生成清除缓存的HTML文件
        if (shouldCleanCache) {
            generateCacheCleaner();
        }
    } catch (error) {
        console.error('生成 posts.json 时出错:', error);
    }
}

// 执行
generatePostsJson();