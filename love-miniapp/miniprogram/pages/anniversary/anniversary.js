const api = require('../../utils/api');

Page({
  data: {
    userId: '',
    types: ['恋爱纪念日', '生日', '特殊纪念日'],
    form: { title: '', date: '', typeIndex: 0 },
    list: []
  },

  onShow() {
    const userId = wx.getStorageSync('userId');
    this.setData({ userId });
    this.loadList();
  },

  onInput(e) {
    this.setData({ 'form.title': e.detail.value });
  },

  onDateChange(e) {
    this.setData({ 'form.date': e.detail.value });
  },

  onTypeChange(e) {
    this.setData({ 'form.typeIndex': Number(e.detail.value) });
  },

  async submit() {
    const { userId, form, types } = this.data;
    if (!userId) return wx.showToast({ title: '请先登录', icon: 'none' });
    if (!form.title || !form.date) return wx.showToast({ title: '请完善信息', icon: 'none' });

    try {
      await api.addAnniversary({ user_id: userId, title: form.title, date: form.date, type: types[form.typeIndex] });
      wx.showToast({ title: '添加成功', icon: 'success' });
      this.setData({ form: { title: '', date: '', typeIndex: 0 } });
      this.loadList();
    } catch (e) {
      wx.showToast({ title: e.message || '保存失败', icon: 'none' });
    }
  },

  getCountdownText(dateStr) {
    const now = new Date();
    const target = new Date(dateStr);
    const thisYearTarget = new Date(now.getFullYear(), target.getMonth(), target.getDate());
    let diff = thisYearTarget.getTime() - now.getTime();
    if (diff < 0) {
      const nextYearTarget = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
      diff = nextYearTarget.getTime() - now.getTime();
    }
    return `距离下次还有 ${Math.ceil(diff / (1000 * 60 * 60 * 24))} 天`;
  },

  async loadList() {
    if (!this.data.userId) return;
    try {
      const res = await api.listAnniversary(this.data.userId);
      const list = (res.data || []).map((item) => ({ ...item, countdownText: this.getCountdownText(item.date) }));
      this.setData({ list });
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  }
});
