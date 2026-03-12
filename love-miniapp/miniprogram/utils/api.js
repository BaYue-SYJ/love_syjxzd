const { request, upload } = require('./request');

module.exports = {
  login: (data) => request({ url: '/api/login', method: 'POST', data }),
  getUserInfo: (userId) => request({ url: `/api/user/info?user_id=${userId}` }),
  bindCouple: (data) => request({ url: '/api/user/bind', method: 'POST', data }),

  addTimeline: (data) => request({ url: '/api/timeline/add', method: 'POST', data }),
  listTimeline: (userId) => request({ url: `/api/timeline/list?user_id=${userId}` }),

  uploadAlbum: ({ filePath, user_id, description }) =>
    upload({ url: '/api/album/upload', filePath, formData: { user_id, description } }),
  listAlbum: (userId) => request({ url: `/api/album/list?user_id=${userId}` }),

  addDiary: (data) => request({ url: '/api/diary/add', method: 'POST', data }),
  listDiary: (userId) => request({ url: `/api/diary/list?user_id=${userId}` }),

  addAnniversary: (data) => request({ url: '/api/anniversary/add', method: 'POST', data }),
  listAnniversary: (userId) => request({ url: `/api/anniversary/list?user_id=${userId}` })
};
