// 25时、Nightcord见 风格的 HTML 模板
export const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Hiragino Sans', 'Yu Gothic UI', sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e4e4e4;
    position: relative;
    overflow: hidden;
  }

  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(136, 84, 208, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(72, 52, 212, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  .container {
    background: rgba(26, 26, 46, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(136, 84, 208, 0.3);
    border-radius: 16px;
    padding: 48px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    position: relative;
    z-index: 1;
  }

  .logo {
    text-align: center;
    margin-bottom: 32px;
  }

  .logo h1 {
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(135deg, #8854d0 0%, #4834d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
    letter-spacing: 2px;
  }

  .logo p {
    font-size: 14px;
    color: #a0a0a0;
    font-weight: 300;
  }

  .form-group {
    margin-bottom: 24px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #b0b0b0;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(136, 84, 208, 0.3);
    border-radius: 8px;
    color: #e4e4e4;
    font-size: 15px;
    transition: all 0.3s ease;
  }

  input:focus {
    outline: none;
    border-color: #8854d0;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(136, 84, 208, 0.1);
  }

  input::placeholder {
    color: #606060;
  }

  button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #8854d0 0%, #4834d4 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 8px;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(136, 84, 208, 0.4);
  }

  button:active {
    transform: translateY(0);
  }

  .error {
    background: rgba(220, 53, 69, 0.15);
    border: 1px solid rgba(220, 53, 69, 0.3);
    color: #ff6b6b;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .success {
    background: rgba(40, 167, 69, 0.15);
    border: 1px solid rgba(40, 167, 69, 0.3);
    color: #51cf66;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .link {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: #a0a0a0;
  }

  .link a {
    color: #8854d0;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .link a:hover {
    color: #a06ee8;
  }

  .divider {
    height: 1px;
    background: rgba(136, 84, 208, 0.2);
    margin: 32px 0;
  }

  .user-info {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(136, 84, 208, 0.3);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
  }

  .user-info p {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .user-info strong {
    color: #8854d0;
  }
`;

export function renderPage(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - SEKAI Pass</title>
  <style>${styles}</style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1>SEKAI Pass</h1>
      <p>25時、Nightcordで。</p>
    </div>
    ${content}
  </div>
</body>
</html>`;
}

export function loginForm(error?: string): string {
  return renderPage("ログイン", `
    ${error ? `<div class="error">${error}</div>` : ""}
    <form method="POST" action="/login">
      <div class="form-group">
        <label for="username">ユーザー名</label>
        <input type="text" id="username" name="username" required placeholder="ユーザー名を入力">
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input type="password" id="password" name="password" required placeholder="パスワードを入力">
      </div>
      <button type="submit">ログイン</button>
    </form>
    <div class="link">
      <p>アカウントをお持ちでない方は <a href="/register">新規登録</a></p>
    </div>
  `);
}

export function registerForm(error?: string): string {
  return renderPage("新規登録", `
    ${error ? `<div class="error">${error}</div>` : ""}
    <form method="POST" action="/register">
      <div class="form-group">
        <label for="username">ユーザー名</label>
        <input type="text" id="username" name="username" required placeholder="ユーザー名を入力">
      </div>
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input type="email" id="email" name="email" required placeholder="メールアドレスを入力">
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input type="password" id="password" name="password" required placeholder="パスワードを入力">
      </div>
      <div class="form-group">
        <label for="display_name">表示名（任意）</label>
        <input type="text" id="display_name" name="display_name" placeholder="表示名を入力">
      </div>
      <button type="submit">登録</button>
    </form>
    <div class="link">
      <p>既にアカウントをお持ちの方は <a href="/login">ログイン</a></p>
    </div>
  `);
}

export function dashboardPage(user: any): string {
  return renderPage("ダッシュボード", `
    <div class="user-info">
      <p><strong>ユーザー名:</strong> ${user.username}</p>
      <p><strong>メール:</strong> ${user.email}</p>
      ${user.displayName ? `<p><strong>表示名:</strong> ${user.displayName}</p>` : ""}
    </div>
    <form method="POST" action="/logout">
      <button type="submit">ログアウト</button>
    </form>
  `);
}

export function authorizePage(app: any, user: any): string {
  return renderPage("認証", `
    <div class="user-info">
      <p><strong>${app.name}</strong> がアクセスを要求しています</p>
      <p style="margin-top: 12px; color: #a0a0a0;">ログイン中: ${user.username}</p>
    </div>
    <form method="POST" action="/oauth/authorize">
      <input type="hidden" name="client_id" value="${app.client_id}">
      <input type="hidden" name="redirect_uri" value="${app.redirect_uri}">
      <button type="submit" name="action" value="allow">許可</button>
      <button type="submit" name="action" value="deny" style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); margin-top: 12px;">拒否</button>
    </form>
  `);
}
