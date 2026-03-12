const app = getApp();

function request({ url, method = 'GET', data = {}, header = {} }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.baseURL}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        ...header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res.data || { message: '请求失败' });
        }
      },
      fail: reject
    });
  });
}

function upload({ url, filePath, name = 'image', formData = {} }) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${app.globalData.baseURL}${url}`,
      filePath,
      name,
      formData,
      success: (res) => {
        try {
          const data = JSON.parse(res.data);
          resolve(data);
        } catch (e) {
          reject(new Error('上传返回格式错误'));
        }
      },
      fail: reject
    });
  });
}

module.exports = {
  request,
  upload
};
