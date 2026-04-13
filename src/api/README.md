# 📦 APIAPI 專案說明

一個使用 **Node.js + Express + SQLite** 建立的全端應用，  
提供任務清單（Todo）CRUD API，並可與前端（React）串接。

---

## 🚀 專案特色

- 🔹 Node.js + Express 建立後端 API
- 🔹 SQLite 輕量資料庫
- 🔹 支援完整 CRUD（新增 / 查詢 / 修改 / 刪除）
- 🔹 RESTful API 設計
- 🔹 可與 React 前端整合

---

## 📁 專案結構

```
src/
  api/                # API 請求
    contact.js
    server.js         # SQLite API
    todo.db           # SQLite 資料庫

```
## 📡 API 路由說明

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/todos` | 取得所有任務 |
| POST | `/todos` | 新增任務 |
| PUT | `/todos/:id` | 修改任務 |
| DELETE | `/todos/:id` | 刪除任務 |


## 🛠️ 安裝與啟動
---
* 🔹套件 
```bash
npm install express sqlite3 cors
```
* 1️⃣後端啟動
```bash
 node server.js
```
* 2️⃣前端啟動 
```bash
npm run dev
```
---


---

如果你要再更「作品級 README」（像 GitHub 展示那種🔥），我可以幫你加：

- 📸 Demo 截圖區
- 🔗 Live Demo
- 🧱 技術架構圖
- 📦 API 測試（Postman）

直接說 👉「升級 README」我幫你做到可以拿去面試用 😎