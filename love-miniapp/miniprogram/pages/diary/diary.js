const api = require('../../utils/api');

Page({
  data: {
    userId: '',
    content: '',
    imagePaths: [],
    list: []
  },

  onShow() {
    const userId = wx.getStorageSync('userId');
    this.setData({ userId });
    this.loadList();
  },

  onInput(e) {
    this.setData({ content: e.detail.value });
  },

  chooseImages() {
    wx.chooseImage({
      count: 3,
      success: (res) => this.setData({ imagePaths: res.tempFilePaths })
    });
  },

  async submit() {
    const { userId, content, imagePaths } = this.data;
    if (!userId) return wx.showToast({ title: '请先登录', icon: 'none' });
    if (!content) return wx.showToast({ title: '请输入日记内容', icon: 'none' });

    try {
      const images = [];
      for (const filePath of imagePaths) {
        const uploadRes = await api.uploadAlbum({ filePath, user_id: userId, description: 'diary' });
        images.push(uploadRes.data.image_url);
      }
      await api.addDiary({ user_id: userId, content, images });
      wx.showToast({ title: '发布成功', icon: 'success' });
      this.setData({ content: '', imagePaths: [] });
      this.loadList();
    } catch (e) {
      wx.showToast({ title: e.message || '发布失败', icon: 'none' });
    }
  },

  async loadList() {
    if (!this.data.userId) return;
    try {
      const res = await api.listDiary(this.data.userId);
      this.setData({ list: res.data || [] });
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  }
});
