import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [items, setItems] = useState([
    { id: 1, text: '學習 React' },
    { id: 2, text: '實作 CRUD' }
  ]);



  // 👉 新增編輯狀態


  // 新增


  // 刪除


  // 👉 開始編輯


  // 👉 儲存修改


  return (
    <div className="home-container">
      <div className="todo-card">
        <h2 className="todo-header">✨ 我的任務清單</h2>

        <div className="input-group">
          <input
            className="todo-input"
            placeholder="請輸入新任務..."
          />
          <button className="add-btn">新增</button>
        </div>

        <ul className="todo-list">

          <li className="todo-item">

            {/* 👉 判斷是否為編輯狀態 */}


            <input
              className="todo-input"
            />
            <button className="btn btn-edit">儲存</button>



            <span className="todo-text"></span>
            <div className="action-buttons">
              <button className="btn btn-edit">修改</button>
              <button className="btn btn-delete">刪除</button>
            </div>



          </li>

        </ul>
      </div>
    </div>
  );
}

export default Home;