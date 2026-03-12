require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mysql: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'love_miniapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  uploadDir: 'uploads'
};
