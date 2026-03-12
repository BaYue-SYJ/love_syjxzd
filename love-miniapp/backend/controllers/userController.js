const { query } = require('../db');

function getMockOpenid(code = '') {
  return `mock_openid_${code || Date.now()}`;
}

exports.login = async (req, res, next) => {
  try {
    const { code, nickname = '微信用户', avatar = '' } = req.body;
    if (!code) {
      return res.status(400).json({ message: '缺少 wx.login code' });
    }

    const openid = getMockOpenid(code);
    const users = await query('SELECT * FROM users WHERE openid = ?', [openid]);
    let user;

    if (users.length) {
      user = users[0];
      await query('UPDATE users SET nickname = ?, avatar = ? WHERE id = ?', [nickname, avatar, user.id]);
      user.nickname = nickname;
      user.avatar = avatar;
    } else {
      const result = await query(
        'INSERT INTO users (openid, nickname, avatar, created_at) VALUES (?, ?, ?, NOW())',
        [openid, nickname, avatar]
      );
      user = {
        id: result.insertId,
        openid,
        nickname,
        avatar
      };
    }

    return res.json({
      message: '登录成功',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.query.user_id;
    if (!userId) {
      return res.status(400).json({ message: '缺少 user_id' });
    }

    const users = await query('SELECT id, openid, nickname, avatar, created_at FROM users WHERE id = ?', [userId]);
    if (!users.length) {
      return res.status(404).json({ message: '用户不存在' });
    }

    const user = users[0];
    const couples = await query(
      `SELECT c.*, u1.nickname AS user1_nickname, u1.avatar AS user1_avatar,
              u2.nickname AS user2_nickname, u2.avatar AS user2_avatar
       FROM couples c
       LEFT JOIN users u1 ON c.user1_id = u1.id
       LEFT JOIN users u2 ON c.user2_id = u2.id
       WHERE c.user1_id = ? OR c.user2_id = ?
       ORDER BY c.id DESC LIMIT 1`,
      [userId, userId]
    );

    return res.json({
      message: '获取成功',
      data: {
        user,
        couple: couples[0] || null
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.bindCouple = async (req, res, next) => {
  try {
    const { user_id, partner_user_id, start_date, love_words = '' } = req.body;
    if (!user_id || !partner_user_id || !start_date) {
      return res.status(400).json({ message: '缺少绑定参数' });
    }

    if (Number(user_id) === Number(partner_user_id)) {
      return res.status(400).json({ message: '不能绑定自己' });
    }

    await query('DELETE FROM couples WHERE user1_id = ? OR user2_id = ?', [user_id, user_id]);
    await query('DELETE FROM couples WHERE user1_id = ? OR user2_id = ?', [partner_user_id, partner_user_id]);

    const result = await query(
      'INSERT INTO couples (user1_id, user2_id, start_date, love_words) VALUES (?, ?, ?, ?)',
      [user_id, partner_user_id, start_date, love_words]
    );

    return res.json({
      message: '绑定成功',
      data: { couple_id: result.insertId }
    });
  } catch (error) {
    next(error);
  }
};
