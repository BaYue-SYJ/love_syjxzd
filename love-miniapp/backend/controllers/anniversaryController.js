const { query } = require('../db');

exports.addAnniversary = async (req, res, next) => {
  try {
    const { user_id, title, date, type } = req.body;
    if (!user_id || !title || !date || !type) {
      return res.status(400).json({ message: '请填写完整信息' });
    }

    const result = await query(
      'INSERT INTO anniversary (user_id, title, date, type) VALUES (?, ?, ?, ?)',
      [user_id, title, date, type]
    );

    res.json({ message: '添加成功', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
};

exports.listAnniversary = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: '缺少 user_id' });
    }

    const rows = await query('SELECT * FROM anniversary WHERE user_id = ? ORDER BY date ASC, id DESC', [user_id]);
    res.json({ message: '获取成功', data: rows });
  } catch (error) {
    next(error);
  }
};
