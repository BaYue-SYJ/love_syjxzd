const api = require('../../utils/api');

Page({
  data: {
    userId: '',
    form: { title: '', date: '', content: '', imagePath: '' },
    list: []
  },

  onShow() {
    const userId = wx.getStorageSync('userId');
    this.setData({ userId });
    this.loadList();
  },

  onInput(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: e.detail.value });
  },

  onDateChange(e) {
    this.setData({ 'form.date': e.detail.value });
  },

  chooseImage() {
    wx.chooseImage({ count: 1, success: (res) => this.setData({ 'form.imagePath': res.tempFilePaths[0] }) });
  },

  async submit() {
    const { userId, form } = this.data;
    if (!userId) return wx.showToast({ title: '请先登录', icon: 'none' });
    if (!form.title || !form.date) return wx.showToast({ title: '标题和日期必填', icon: 'none' });

    try {
      let image = '';
      if (form.imagePath) {
        const uploadRes = await api.uploadAlbum({ filePath: form.imagePath, user_id: userId, description: 'timeline' });
        image = uploadRes.data.image_url;
      }
      await api.addTimeline({ user_id: userId, title: form.title, content: form.content, date: form.date, image });
      wx.showToast({ title: '添加成功', icon: 'success' });
      this.setData({ form: { title: '', date: '', content: '', imagePath: '' } });
      this.loadList();
    } catch (e) {
      wx.showToast({ title: e.message || '提交失败', icon: 'none' });
    }
  },

  async loadList() {
    if (!this.data.userId) return;
    try {
      const res = await api.listTimeline(this.data.userId);
      this.setData({ list: res.data || [] });
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  }
});
