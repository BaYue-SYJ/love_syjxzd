const { query } = require('../db');

exports.addDiary = async (req, res, next) => {
  try {
    const { user_id, content, images = [] } = req.body;
    if (!user_id || !content) {
      return res.status(400).json({ message: '请填写 user_id 和内容' });
    }

    const normalizedImages = Array.isArray(images) ? images : [];
    const result = await query(
      'INSERT INTO diary (user_id, content, images, created_at) VALUES (?, ?, ?, NOW())',
      [user_id, content, JSON.stringify(normalizedImages)]
    );

    res.json({ message: '发布成功', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
};

exports.listDiary = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: '缺少 user_id' });
    }

    const rows = await query('SELECT * FROM diary WHERE user_id = ? ORDER BY created_at DESC, id DESC', [user_id]);
    const parsed = rows.map((item) => ({
      ...item,
      images: item.images ? JSON.parse(item.images) : []
    }));

    res.json({ message: '获取成功', data: parsed });
  } catch (error) {
    next(error);
  }
};
