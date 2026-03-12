# 微信小程序：情侣爱情记录

一个微信小程序 + Node.js 后端的完整项目，支持情侣登录、绑定、时间线、相册、纪念日、恋爱日记。

## 项目目录结构

```text
love-miniapp/
├── backend/
│   ├── app.js
│   ├── config.js
│   ├── db.js
│   ├── package.json
│   ├── schema.sql
│   ├── routes/
│   │   ├── user.js
│   │   ├── timeline.js
│   │   ├── album.js
│   │   ├── diary.js
│   │   └── anniversary.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── timelineController.js
│   │   ├── albumController.js
│   │   ├── diaryController.js
│   │   └── anniversaryController.js
│   └── uploads/
└── miniprogram/
    ├── app.js
    ├── app.json
    ├── app.wxss
    ├── sitemap.json
    ├── pages/
    │   ├── index/
    │   │   ├── index.wxml
    │   │   ├── index.js
    │   │   └── index.wxss
    │   ├── timeline/
    │   │   ├── timeline.wxml
    │   │   ├── timeline.js
    │   │   └── timeline.wxss
    │   ├── album/
    │   │   ├── album.wxml
    │   │   ├── album.js
    │   │   └── album.wxss
    │   ├── diary/
    │   │   ├── diary.wxml
    │   │   ├── diary.js
    │   │   └── diary.wxss
    │   ├── anniversary/
    │   │   ├── anniversary.wxml
    │   │   ├── anniversary.js
    │   │   └── anniversary.wxss
    │   └── profile/
    │       ├── profile.wxml
    │       ├── profile.js
    │       └── profile.wxss
    └── utils/
        ├── request.js
        └── api.js
```

## 功能说明

- 首页：恋爱天数、情侣头像、恋爱宣言、功能导航。
- 爱情时间线：新增/查看恋爱事件（支持图片）。
- 情侣相册：图片上传 + 九宫格展示。
- 纪念日：记录恋爱纪念日/生日/特殊纪念日，含倒计时。
- 恋爱日记：图文发布。
- 情侣绑定：输入双方用户 ID 绑定。
- 登录：微信 `wx.login`（示例项目中后端使用 mock openid 逻辑）。


## 微信开发者工具直接使用（最快路径）

> 你问的“怎么直接用”，按下面做就能在开发者工具里跑起来。

### A. 先启动后端（必须）

```bash
cd love-miniapp/backend
cp .env.example .env
npm install
node app.js
```

看到 `Server listening on http://localhost:3000` 说明后端已启动。

### B. 微信开发者工具导入

1. 打开微信开发者工具。
2. 选择 **导入项目**。
3. 项目目录选择：`love-miniapp/miniprogram`。
4. `AppID`：
   - 没有小程序资质可先用“测试号”或 `touristappid`（本项目已提供 `project.config.json`）。
5. 点击导入并编译。

### C. 把后端地址改成你机器可访问的地址

编辑 `miniprogram/app.js`：

- 模拟器里可用：`http://127.0.0.1:3000`
- 真机调试建议改成你电脑局域网 IP：`http://192.168.x.x:3000`

### D. 如果请求失败（最常见）

在开发者工具里：

- 详情 -> 本地设置 -> 勾选 **不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书**。

这样本地 `http` 接口就能直接调通。

## API 列表

- `POST /api/login`
- `GET /api/user/info`
- `POST /api/user/bind`
- `POST /api/timeline/add`
- `GET /api/timeline/list`
- `POST /api/album/upload`
- `GET /api/album/list`
- `POST /api/diary/add`
- `GET /api/diary/list`
- `POST /api/anniversary/add`
- `GET /api/anniversary/list`

## 数据库

执行 `backend/schema.sql` 建表。

```bash
mysql -uroot -p < backend/schema.sql
```

## 运行步骤

### 1) 启动后端

```bash
cd backend
npm install
node app.js
```

> 默认端口 `3000`，可通过环境变量 `PORT`、`DB_HOST`、`DB_USER`、`DB_PASSWORD`、`DB_NAME` 覆盖。

### 2) 启动小程序

1. 打开微信开发者工具。
2. 导入 `love-miniapp/miniprogram` 目录。
3. 在 `miniprogram/app.js` 中确认 `baseURL` 指向你的后端地址（真机测试请替换为局域网 IP）。
4. 编译运行。

## 备注

- 当前版本方便本地调试，`wx.login` 使用 mock openid 逻辑；生产环境需接入微信官方接口换取真实 openid。
- 图片保存在 `backend/uploads`，通过 `/uploads/*` 对外访问。
