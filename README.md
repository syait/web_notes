# Web Notes 静态博客

Web Notes 是一个简单的静态博客系统，使用纯 HTML、CSS 和 JavaScript 实现，不需要服务器端语言或数据库支持。博客文章使用 Markdown 格式编写，存储在 `posts` 目录中。

## 特点

- 纯静态网站，无需服务器端语言
- 文章使用 Markdown 格式
- 支持文章分类和标签
- 响应式设计，适配移动设备
- 简洁美观的界面

## 目录结构

```
web_notes/
├── index.html        # 首页
├── post.html         # 文章页面
├── category.html     # 分类页面
├── tag.html          # 标签页面
├── about.html        # 关于页面
├── posts.json        # 文章元数据列表
├── css/              # 样式文件
│   └── main.css
├── js/               # JavaScript 脚本
│   └── main.js
└── posts/            # Markdown 文章
    ├── hello-world.md
    ├── markdown-guide.md
    └── web-notes-update.md
```

## 使用方法

1. 克隆或下载本项目
2. 在 `posts` 目录下添加 Markdown 格式的文章
3. 更新 `posts.json` 文件，添加新文章的元数据
4. 使用任何静态文件服务器（例如 GitHub Pages、Netlify、Vercel 等）部署网站

## 发布新文章

### 步骤 1: 创建 Markdown 文件

1. 在 `posts` 目录下创建一个新的 Markdown 文件（`.md` 扩展名）
2. 文件名应该使用英文，建议使用短横线分隔单词，例如 `my-new-post.md`
3. 文件名将作为文章的唯一标识符（ID），用于 URL 中

### 步骤 2: 编写文章内容

1. 在 Markdown 文件的开头添加 YAML 格式的 frontmatter 头部，包含以下信息：

```markdown
---
title: 文章标题
date: YYYY-MM-DD
categories: 
  - 分类名称1
  - 分类名称2（可选）
tags:
  - 标签1
  - 标签2
  - 标签3（可选）
---

正文内容...
```

2. frontmatter 部分必须包含：
   - `title`: 文章标题
   - `date`: 发布日期，格式为 `YYYY-MM-DD`
   - `categories`: 文章分类，至少一个
   - `tags`: 文章标签，可以有多个

3. 在 frontmatter 之后编写文章正文，使用 Markdown 语法

### 步骤 3: 更新 posts.json 文件

1. 打开 `posts.json` 文件
2. 在数组的开头（最新文章放在前面）添加新文章的元数据：

```json
{
    "id": "my-new-post",
    "title": "文章标题",
    "date": "YYYY-MM-DD",
    "categories": ["分类名称1", "分类名称2"],
    "tags": ["标签1", "标签2", "标签3"],
    "excerpt": "文章摘要，简短描述文章内容"
}
```

3. 确保：
   - `id` 与 Markdown 文件名相同（不包含 `.md` 扩展名）
   - `title`、`date`、`categories` 和 `tags` 与 Markdown 文件中的 frontmatter 一致
   - 添加一个简短的 `excerpt` 作为文章摘要

### 注意事项

1. **文件名和 ID**：
   - 文件名应该只包含小写字母、数字和短横线
   - 文件名将作为文章的 URL，所以应该简洁明了
   - 确保 `posts.json` 中的 `id` 与文件名完全一致

2. **Frontmatter 格式**：
   - YAML 格式对缩进和空格敏感，请确保格式正确
   - 冒号后必须有一个空格
   - 列表项前必须有两个空格和一个短横线

3. **日期格式**：
   - 必须使用 `YYYY-MM-DD` 格式
   - 例如：`2024-07-15`

4. **分类和标签**：
   - 分类通常用于大的主题划分，一篇文章的分类不宜过多
   - 标签可以更加具体和灵活，一篇文章可以有多个标签
   - 分类和标签名称在所有文章中应保持一致，注意大小写

5. **文章摘要**：
   - 摘要应简洁明了，通常不超过 200 个字符
   - 摘要将显示在首页的文章列表中

## 编写文章

每篇文章需要包含 YAML 格式的 frontmatter 头部，例如：

```markdown
---
title: 文章标题
date: 2024-07-10
categories: 
  - 分类名称
tags:
  - 标签1
  - 标签2
---

正文内容...
```

## 许可证

MIT 