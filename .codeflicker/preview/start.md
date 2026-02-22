# 数据Agent 启动指南

## 项目概述
这是一个静态 HTML 项目，包含 AI 转型报告页面，使用 Python HTTP 服务器进行本地预览。

## 快速启动

在项目根目录下运行 Python HTTP 服务器：

```bash
python3 -m http.server 8080
```

**启动后访问**：http://localhost:8080/ai-transformation-report.html

```yaml
subProjectPath: .
command: python3 -m http.server 8080
cwd: .
port: 8080
previewUrl: http://localhost:8080/ai-transformation-report.html
description: 静态 HTML 服务器，用于预览 AI 转型报告页面
```
