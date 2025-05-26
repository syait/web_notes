/**
 * 自动生成 posts.json 文件的脚本
 * 使用方法：node generate-posts-json.js
 * 需要 Node.js 环境
 */

const fs = require('fs');
const path = require('path');

// 配置
const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'posts.json');

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
        
        files.forEach(file => {
            const filePath = path.join(postsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const parsed = parseFrontmatter(content);
            
            if (!parsed) {
                console.warn(`警告: 无法解析 frontmatter: ${file}`);
                return;
            }
            
            const { frontmatter, excerpt } = parsed;
            const id = file.replace(/\.md$/, '');
            
            // 检查必要的字段
            if (!frontmatter.title || !frontmatter.date) {
                console.warn(`警告: 缺少必要的 frontmatter 字段 (title 或 date): ${file}`);
                return;
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
    } catch (error) {
        console.error('生成 posts.json 时出错:', error);
    }
}

// 执行
generatePostsJson(); 