const api = require('../../utils/api');

Page({
  data: {
    nickname: '甜心',
    avatar: '',
    user: null,
    partnerUserId: '',
    startDate: '',
    loveWords: '与你相爱，是我最甜的幸运。'
  },

  onShow() {
    const user = wx.getStorageSync('user');
    if (user) {
      this.setData({ user });
    }
  },

  onNicknameInput(e) { this.setData({ nickname: e.detail.value }); },
  onAvatarInput(e) { this.setData({ avatar: e.detail.value }); },
  onPartnerInput(e) { this.setData({ partnerUserId: e.detail.value }); },
  onDateChange(e) { this.setData({ startDate: e.detail.value }); },
  onWordsInput(e) { this.setData({ loveWords: e.detail.value }); },

  login() {
    wx.login({
      success: async (res) => {
        try {
          const result = await api.login({ code: res.code, nickname: this.data.nickname, avatar: this.data.avatar });
          const user = result.data.user;
          wx.setStorageSync('user', user);
          wx.setStorageSync('userId', user.id);
          this.setData({ user });
          wx.showToast({ title: '登录成功', icon: 'success' });
        } catch (e) {
          wx.showToast({ title: e.message || '登录失败', icon: 'none' });
        }
      }
    });
  },

  async bindCouple() {
    const { user, partnerUserId, startDate, loveWords } = this.data;
    if (!user) return wx.showToast({ title: '请先登录', icon: 'none' });
    if (!partnerUserId || !startDate) return wx.showToast({ title: '请填写完整信息', icon: 'none' });

    try {
      await api.bindCouple({
        user_id: user.id,
        partner_user_id: Number(partnerUserId),
        start_date: startDate,
        love_words: loveWords
      });
      wx.showToast({ title: '绑定成功', icon: 'success' });
    } catch (e) {
      wx.showToast({ title: e.message || '绑定失败', icon: 'none' });
    }
  }
});
