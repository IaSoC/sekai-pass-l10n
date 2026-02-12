import { showError, showSuccess, setLoading } from '../utils.js';

export async function renderSettings(app, api, navigate) {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  api.setAuthToken(token);

  app.innerHTML = `
    <div class="container">
      <div class="logo">
        <img src="/logo.png" alt="SEKAI Pass" width="300" />
      </div>
      <h2 style="text-align: center; margin-bottom: 2rem;">账号设置</h2>
      <div id="error-message" class="error" style="display: none;"></div>
      <div id="success-message" class="success" style="display: none;"></div>
      <form id="settings-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" disabled />
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" disabled />
        </div>
        <div class="form-group">
          <label for="display_name">昵称</label>
          <input type="text" id="display_name" maxlength="50" placeholder="设置你的昵称" />
        </div>
        <div class="form-group">
          <label for="avatar_url">头像 URL</label>
          <input type="url" id="avatar_url" maxlength="500" placeholder="https://example.com/avatar.jpg" />
          <small style="color: var(--text-secondary); font-size: 0.85rem;">输入图片链接作为头像</small>
        </div>
        <button type="submit" id="save-btn">保存修改</button>
      </form>
      <div style="margin-top: 2rem; text-align: center;">
        <button id="back-btn" style="background: linear-gradient(135deg, #718093 0%, #2f3640 100%); width: auto; min-width: 120px;">返回</button>
      </div>
    </div>
    <footer class="site-footer">
      <a href="https://docs.nightcord.de5.net/legal/complete/privacy-sekai-pass" target="_blank">隐私政策</a> |
      <a href="https://docs.nightcord.de5.net/legal/complete/terms-sekai-pass" target="_blank">用户服务协议</a>
    </footer>
  `;

  // Load user info
  try {
    const user = await api.get('/auth/me', {
      headers: api.getAuthHeaders()
    });

    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('display_name').value = user.display_name || '';
    document.getElementById('avatar_url').value = user.avatar_url || '';
  } catch (error) {
    showError('获取用户信息失败');
    if (error.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  // Handle form submission
  const form = document.getElementById('settings-form');
  const saveBtn = document.getElementById('save-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setLoading(saveBtn, true);

    const displayName = document.getElementById('display_name').value.trim();
    const avatarUrl = document.getElementById('avatar_url').value.trim();

    try {
      const updateData = {};
      if (displayName) updateData.display_name = displayName;
      if (avatarUrl) updateData.avatar_url = avatarUrl;

      if (Object.keys(updateData).length === 0) {
        showError('请至少填写一个字段');
        setLoading(saveBtn, false);
        return;
      }

      await api.put('/auth/profile', updateData, {
        headers: api.getAuthHeaders()
      });

      showSuccess('资料更新成功');
    } catch (error) {
      showError(error.message || '更新失败，请重试');
    } finally {
      setLoading(saveBtn, false);
    }
  });

  // Handle back button
  const backBtn = document.getElementById('back-btn');
  backBtn.addEventListener('click', () => {
    navigate('/dashboard');
  });
}
