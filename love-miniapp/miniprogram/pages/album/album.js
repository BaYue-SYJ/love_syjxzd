const api = require('../../utils/api');

Page({
  data: {
    userId: '',
    description: '',
    list: []
  },

  onShow() {
    const userId = wx.getStorageSync('userId');
    this.setData({ userId });
    this.loadList();
  },

  onDescInput(e) {
    this.setData({ description: e.detail.value });
  },

  uploadPhoto() {
    const { userId, description } = this.data;
    if (!userId) return wx.showToast({ title: '请先登录', icon: 'none' });

    wx.chooseImage({
      count: 1,
      success: async (res) => {
        try {
          await api.uploadAlbum({ filePath: res.tempFilePaths[0], user_id: userId, description });
          wx.showToast({ title: '上传成功', icon: 'success' });
          this.setData({ description: '' });
          this.loadList();
        } catch (e) {
          wx.showToast({ title: e.message || '上传失败', icon: 'none' });
        }
      }
    });
  },

  async loadList() {
    if (!this.data.userId) return;
    try {
      const res = await api.listAlbum(this.data.userId);
      this.setData({ list: res.data || [] });
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  }
});
