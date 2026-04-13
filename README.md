# 📦 React Project

一個使用 React 建立的前端專案，包含基本頁面、表單送出（Contact）、API 串接與路由管理。

---

## 🚀 專案特色

* 🔹 React + Hooks（useState）
* 🔹 React Router 路由管理
* 🔹 表單送出（Contact Form）
* 🔹 API 串接（axios / fetch）
* 🔹 模組化資料夾結構（pages / components / api / routes）

---

## 📁 專案結構

```
src/
  api/                # API 請求
    contact.js
    server.js         # SQLite API
    todo.db           # SQLite 資料庫

  components/         # 共用元件
    Nav.jsx
    Footer.jsx

  pages/              # 頁面
    About/
      About.jsx
    ContactSend/
      ContactSend.jsx
      ContactSend.css

  routes/             # 路由設定
    index.jsx

  App.jsx
  main.jsx
```


## GitHub 
* git branch -M main
* git remote add origin git@github.com:s1710931008/react-basic.git
* git push -u origin main



---

## 🧭 路由說明

| 路徑              | 頁面   |
| --------------- | ---- |
| `/`             | 首頁   |
| `/about`        | 關於我們 |
| `/contact/send` | 聯絡表單 |

---

## 🛠️ 安裝與啟動

### 1️⃣ 安裝套件

```bash
npm install
```

### 2️⃣ 啟動開發環境

```bash
npm run dev
```

---

## 🔌 API 使用

範例（`src/api/contact.js`）：

```js
import axios from 'axios'

export const postA2 = (data) => {
    return axios.post('/api/contact', data)
}
```

---

## 🧾 Contact 表單功能

* ✔ 姓名輸入
* ✔ 電話驗證（台灣手機 09 開頭）
* ✔ 訊息填寫
* ✔ 表單送出 API
* ✔ 成功/失敗提示

---

## 📐 開發規範

### 命名規則

| 類型  | 命名                          |
| --- | --------------------------- |
| 元件  | PascalCase（Nav.jsx）         |
| 頁面  | PascalCase（ContactSend.jsx） |
| API | 小寫（contact.js）              |

---

### 資料夾規則

* `pages/` → 放頁面
* `components/` → 放共用元件
* `api/` → 放 API 請求
* `routes/` → 路由設定

---

## 🔥 未來可擴充

* 🔸 Login / Auth 驗證
* 🔸 Protected Route（權限控管）
* 🔸 Dashboard / 後台
* 🔸 狀態管理（Redux / Zustand）
* 🔸 UI Framework（MUI / Tailwind）

---

## 👨‍💻 Author

* Your Name

---

## 📄 License

MIT License


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
