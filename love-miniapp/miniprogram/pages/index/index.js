const api = require('../../utils/api');

Page({
  data: {
    userId: '',
    couple: null,
    loveDays: 0,
    defaultAvatar: 'https://via.placeholder.com/100x100.png?text=Love',
    bgUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=60'
  },

  onShow() {
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.showToast({ title: '请先去个人中心登录', icon: 'none' });
      return;
    }
    this.setData({ userId });
    this.loadUserInfo();
  },

  async loadUserInfo() {
    try {
      const res = await api.getUserInfo(this.data.userId);
      const couple = res.data.couple;
      let loveDays = 0;
      if (couple && couple.start_date) {
        const start = new Date(couple.start_date);
        loveDays = Math.max(1, Math.ceil((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24)));
      }
      this.setData({ couple, loveDays });
    } catch (e) {
      wx.showToast({ title: e.message || '加载失败', icon: 'none' });
    }
  }
});
