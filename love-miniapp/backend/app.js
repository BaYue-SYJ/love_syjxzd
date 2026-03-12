const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config');

const userRoutes = require('./routes/user');
const timelineRoutes = require('./routes/timeline');
const albumRoutes = require('./routes/album');
const diaryRoutes = require('./routes/diary');
const anniversaryRoutes = require('./routes/anniversary');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, config.uploadDir)));

app.use('/api', userRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/album', albumRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/anniversary', anniversaryRoutes);

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'love-miniapp backend is running' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: '服务器内部错误', error: err.message });
});

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});
