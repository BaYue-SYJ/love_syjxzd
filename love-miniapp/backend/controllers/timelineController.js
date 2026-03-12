const { query } = require('../db');

exports.addTimeline = async (req, res, next) => {
  try {
    const { user_id, title, content = '', image = '', date } = req.body;
    if (!user_id || !title || !date) {
      return res.status(400).json({ message: '请填写 user_id、标题和日期' });
    }

    const result = await query(
      'INSERT INTO timeline (user_id, title, content, image, date) VALUES (?, ?, ?, ?, ?)',
      [user_id, title, content, image, date]
    );

    res.json({ message: '添加成功', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
};

exports.listTimeline = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: '缺少 user_id' });
    }

    const rows = await query('SELECT * FROM timeline WHERE user_id = ? ORDER BY date DESC, id DESC', [user_id]);
    res.json({ message: '获取成功', data: rows });
  } catch (error) {
    next(error);
  }
};
