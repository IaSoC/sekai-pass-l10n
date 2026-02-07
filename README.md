# SEKAI Pass

**25時、Nightcordで。** をテーマにした SSO (Single Sign-On) システム

Cloudflare Workers と Lucia Auth を使用した、モダンで安全な認証システムです。

## ✨ 特徴

- 🎨 25時、Nightcord見 風のダークテーマ UI
- 🔐 Lucia Auth による安全な認証（Scrypt パスワードハッシュ）
- ⚡ Cloudflare Workers でエッジデプロイ
- 🗄️ D1 データベースによるデータ永続化
- 🔄 OAuth 2.0 Authorization Code フロー対応
- 🎯 Hono フレームワークによる高速ルーティング

## 📦 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Cloudflare D1 データベースの作成

```bash
# データベースを作成
npx wrangler d1 create sekai_pass_db
```

出力された `database_id` を `wrangler.toml` の `database_id` フィールドに設定してください。

### 3. データベーススキーマの適用

```bash
# ローカル開発用
npx wrangler d1 execute sekai_pass_db --local --file=./schema.sql

# 本番環境用
npx wrangler d1 execute sekai_pass_db --remote --file=./schema.sql
```

### 4. ローカル開発

```bash
npm run dev
```

ブラウザで `http://localhost:8787` を開きます。

### 5. デプロイ

```bash
npm run deploy
```

## 🎮 使い方

### ユーザー登録とログイン

1. `/register` にアクセスして新規アカウントを作成
2. `/login` でログイン
3. ダッシュボードでユーザー情報を確認

### OAuth クライアントの登録

アプリケーションを SSO に統合するには、まずクライアントを登録する必要があります。

```bash
# ローカル開発環境
npx wrangler d1 execute sekai_pass_db --local --command "
INSERT INTO applications (id, name, client_id, client_secret, redirect_uris, created_at)
VALUES (
  'app-001',
  'My Application',
  'my-client-id',
  'my-client-secret',
  '[\"http://localhost:3000/callback\"]',
  $(date +%s)000
);"

# 本番環境
npx wrangler d1 execute sekai_pass_db --remote --command "..."
```

### OAuth 2.0 フロー

#### 1. 認証リクエスト

ユーザーを以下の URL にリダイレクトします：

```
GET https://your-domain.workers.dev/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code
```

#### 2. トークン取得

認証コードを使ってアクセストークンを取得：

```bash
curl -X POST https://your-domain.workers.dev/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "client_id=CLIENT_ID" \
  -d "client_secret=CLIENT_SECRET"
```

レスポンス：
```json
{
  "access_token": "session-token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

#### 3. ユーザー情報取得

```bash
curl https://your-domain.workers.dev/oauth/userinfo \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

レスポンス：
```json
{
  "id": "user-id",
  "username": "username",
  "email": "user@example.com",
  "display_name": "Display Name"
}
```

## 🛣️ API エンドポイント

### 認証

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/login` | ログインページ |
| POST | `/login` | ログイン処理 |
| GET | `/register` | 登録ページ |
| POST | `/register` | 登録処理 |
| POST | `/logout` | ログアウト |

### OAuth 2.0

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/oauth/authorize` | 認証エンドポイント |
| POST | `/oauth/authorize` | 認証承認処理 |
| POST | `/oauth/token` | トークンエンドポイント |
| GET | `/oauth/userinfo` | ユーザー情報エンドポイント |

## 🗄️ データベーススキーマ

### users テーブル
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

### sessions テーブル
```sql
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### applications テーブル
```sql
CREATE TABLE applications (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    client_id TEXT NOT NULL UNIQUE,
    client_secret TEXT NOT NULL,
    redirect_uris TEXT NOT NULL,  -- JSON array
    created_at INTEGER NOT NULL
);
```

### auth_codes テーブル
```sql
CREATE TABLE auth_codes (
    code TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    client_id TEXT NOT NULL,
    redirect_uri TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔒 セキュリティ

- ✅ パスワードは Scrypt でハッシュ化（Oslo ライブラリ使用）
- ✅ セッションは Lucia Auth で管理（30日間有効）
- ✅ HTTPS 必須（本番環境）
- ✅ セキュアクッキー（SameSite=Lax）
- ✅ 認証コードは10分間有効
- ✅ セッション自動更新

## 🎨 カスタマイズ

### UI のカスタマイズ

`src/lib/html.ts` の `styles` 変数を編集してテーマをカスタマイズできます：

```typescript
export const styles = `
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    // カスタムカラーに変更
  }
`;
```

### 認証フローのカスタマイズ

`src/index.ts` でルートハンドラーを編集して、認証フローをカスタマイズできます。

## 📝 開発メモ

### ローカルでのテスト

```bash
# 開発サーバー起動
npm run dev

# 別のターミナルで D1 データベースを確認
npx wrangler d1 execute sekai_pass_db --local --command "SELECT * FROM users"
```

### デバッグ

Cloudflare Workers のログは `wrangler tail` で確認できます：

```bash
npx wrangler tail
```

## 🚀 本番環境へのデプロイ

1. `wrangler.toml` の設定を確認
2. データベースを本番環境に作成
3. スキーマを適用
4. デプロイ

```bash
npm run deploy
```

## 📄 ライセンス

MIT

## 🤝 貢献

プルリクエストを歓迎します！
