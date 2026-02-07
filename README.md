# SEKAI Pass

**25時、Nightcordで。** をテーマにした SSO (Single Sign-On) システム

Cloudflare Workers と Lucia Auth を使用した、モダンで安全な認証システムです。

## 特徴

- 🎨 25時、Nightcord見 風のダークテーマ UI
- 🔐 Lucia Auth による安全な認証
- ⚡ Cloudflare Workers でエッジデプロイ
- 🗄️ D1 データベースによるデータ永続化
- 🔄 OAuth 2.0 フロー対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Cloudflare D1 データベースの作成

```bash
# データベースを作成
npx wrangler d1 create sekai_pass_db

# 出力された database_id を wrangler.toml に設定
```

### 3. データベーススキーマの適用

```bash
npx wrangler d1 execute sekai_pass_db --file=./schema.sql
```

### 4. KV ネームスペースの作成（オプション）

```bash
npx wrangler kv:namespace create SESSIONS

# 出力された id を wrangler.toml に設定
```

### 5. ローカル開発

```bash
npm run dev
```

ブラウザで `http://localhost:8787` を開きます。

### 6. デプロイ

```bash
npm run deploy
```

## 使い方

### ユーザー登録とログイン

1. `/register` にアクセスして新規アカウントを作成
2. `/login` でログイン
3. ダッシュボードでユーザー情報を確認

### OAuth クライアントの登録

アプリケーションを SSO に統合するには、まずクライアントを登録する必要があります。

```sql
INSERT INTO applications (id, name, client_id, client_secret, redirect_uris, created_at)
VALUES (
  'app-id',
  'My Application',
  'client-id-here',
  'client-secret-here',
  '["https://myapp.com/callback"]',
  strftime('%s', 'now') * 1000
);
```

### OAuth フロー

1. **認証リクエスト**
   ```
   GET /oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code
   ```

2. **トークン取得**
   ```
   POST /oauth/token
   Content-Type: application/x-www-form-urlencoded

   grant_type=authorization_code&code=CODE&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
   ```

3. **ユーザー情報取得**
   ```
   GET /oauth/userinfo
   Authorization: Bearer ACCESS_TOKEN
   ```

## API エンドポイント

### 認証

- `GET /login` - ログインページ
- `POST /login` - ログイン処理
- `GET /register` - 登録ページ
- `POST /register` - 登録処理
- `POST /logout` - ログアウト

### OAuth 2.0

- `GET /oauth/authorize` - 認証エンドポイント
- `POST /oauth/authorize` - 認証承認処理
- `POST /oauth/token` - トークンエンドポイント
- `GET /oauth/userinfo` - ユーザー情報エンドポイント

## データベーススキーマ

### users テーブル
- `id` - ユーザー ID
- `username` - ユーザー名（ユニーク）
- `email` - メールアドレス（ユニーク）
- `hashed_password` - ハッシュ化されたパスワード
- `display_name` - 表示名
- `avatar_url` - アバター URL
- `created_at` - 作成日時
- `updated_at` - 更新日時

### sessions テーブル
- `id` - セッション ID
- `user_id` - ユーザー ID
- `expires_at` - 有効期限

### applications テーブル
- `id` - アプリケーション ID
- `name` - アプリケーション名
- `client_id` - クライアント ID
- `client_secret` - クライアントシークレット
- `redirect_uris` - リダイレクト URI（JSON 配列）
- `created_at` - 作成日時

### auth_codes テーブル
- `code` - 認証コード
- `user_id` - ユーザー ID
- `client_id` - クライアント ID
- `redirect_uri` - リダイレクト URI
- `expires_at` - 有効期限

## セキュリティ

- パスワードは SHA-256 でハッシュ化（本番環境では bcrypt や Argon2 の使用を推奨）
- セッションは Lucia Auth で管理
- HTTPS 必須
- CSRF 保護
- セキュアクッキー

## カスタマイズ

### UI のカスタマイズ

`src/lib/html.ts` の `styles` 変数を編集してテーマをカスタマイズできます。

### 認証フローのカスタマイズ

`src/index.ts` でルートハンドラーを編集して、認証フローをカスタマイズできます。

## ライセンス

MIT

## 貢献

プルリクエストを歓迎します！

---

**25時、Nightcordで。**
