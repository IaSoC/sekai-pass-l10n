# 贡献指南

感谢你对 **SEKAI Pass** 项目感兴趣！我们需要你的帮助来让这个项目变得更好。

## 👋 欢迎

无论你是想修复 bug、改进文档、添加新功能，还是仅仅想提出建议，我们都非常欢迎！

## 🛠️ 开发环境设置

### 前置要求

- Node.js >= 18.0.0
- npm 或其他包管理器
- Cloudflare 账号（用于部署和测试）

### 设置步骤

1. **Fork 本仓库**：点击右上角的 "Fork" 按钮。

2. **克隆代码**：
   ```bash
   git clone https://github.com/bili-47177171806/sekai-pass.git
   cd sekai-pass
   ```

3. **安装依赖**：
   ```bash
   npm install
   ```

4. **配置环境变量**：
   ```bash
   cp .dev.vars.example .dev.vars
   # 编辑 .dev.vars 填入你的配置
   ```

5. **配置 Wrangler**：
   ```bash
   cp wrangler.toml.example wrangler.toml
   # 编辑 wrangler.toml 填入你的 database_id 和 KV namespace ID
   ```

6. **创建本地数据库**：
   ```bash
   npx wrangler d1 create sekai_pass_db
   npx wrangler d1 execute sekai_pass_db --local --file=./schema.sql
   ```

7. **启动开发服务器**：
   ```bash
   npm run dev
   ```
   访问 `http://localhost:8787` 查看应用。

## 🐛 提交 Bug

如果你发现了 bug，请在提交 Issue 之前：

1. 搜索现有的 Issue，看看是否已经有人报告过。
2. 如果没有，请创建一个新的 Issue，并使用 **Bug Report** 模板。
3. 请提供清晰的复现步骤、预期行为和实际行为。

## 💡 提交新功能建议

如果你有新的想法：

1. 搜索现有的 Issue，看看是否已经有人提过类似的建议。
2. 创建一个新的 Issue，并使用 **Feature Request** 模板。
3. 详细描述你的想法以及它能解决什么问题。

## 💻 提交代码 (Pull Request)

1. **创建一个新分支**：
   ```bash
   git checkout -b feature/my-new-feature
   # 或者
   git checkout -b fix/my-bug-fix
   ```
2. **进行修改**：请保持代码风格与现有代码一致。
3. **提交更改**：
   ```bash
   git commit -m "feat: 添加了某个很棒的功能"
   ```
   请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。
4. **推送到你的 Fork**：
   ```bash
   git push origin feature/my-new-feature
   ```
5. **提交 Pull Request**：
   - 访问 GitHub 上的原始仓库。
   - 点击 "New Pull Request"。
   - 填写 PR 模板，描述你的更改。

## 🎨 代码风格

- **TypeScript**：本项目使用 TypeScript，请确保类型定义正确。
- **缩进**：使用 2 空格缩进。
- **注释**：关键逻辑和复杂的安全相关代码请添加注释。
- **命名**：使用有意义的变量名和函数名。

## 🧪 测试

在提交 PR 之前，请确保：

1. 代码能够正常编译：
   ```bash
   npm run build
   ```

2. 在本地开发环境测试你的更改：
   ```bash
   npm run dev
   ```

3. 测试相关的 OAuth 2.1 和 OIDC 流程是否正常工作。

## 🔒 安全注意事项

由于这是一个认证系统，安全性至关重要：

- **不要**在代码中硬编码任何密钥、密码或敏感信息。
- **不要**提交包含真实凭证的配置文件（wrangler.toml、.dev.vars）。
- 如果发现安全漏洞，请参考 [SECURITY.md](SECURITY.md) 进行负责任的披露。
- 涉及密码学或认证逻辑的更改需要特别仔细的审查。

## 📜 许可证

参与本项目即表示你同意你的贡献将根据项目的 [MIT License](LICENSE) 授权。

感谢你的贡献！✨
