const path = require('path');
const { query } = require('../db');

function toFileUrl(req, filename) {
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
}

exports.uploadPhoto = async (req, res, next) => {
  try {
    const { user_id, description = '' } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: '缺少 user_id' });
    }
    if (!req.file) {
      return res.status(400).json({ message: '请上传图片文件' });
    }

    const imageUrl = toFileUrl(req, req.file.filename);
    const result = await query(
      'INSERT INTO album (user_id, image_url, description, created_at) VALUES (?, ?, ?, NOW())',
      [user_id, imageUrl, description]
    );

    res.json({
      message: '上传成功',
      data: {
        id: result.insertId,
        image_url: imageUrl,
        filename: req.file.filename,
        ext: path.extname(req.file.originalname)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.listPhotos = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: '缺少 user_id' });
    }

    const rows = await query('SELECT * FROM album WHERE user_id = ? ORDER BY created_at DESC, id DESC', [user_id]);
    res.json({ message: '获取成功', data: rows });
  } catch (error) {
    next(error);
  }
};
