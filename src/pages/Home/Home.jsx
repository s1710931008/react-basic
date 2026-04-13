import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const API_URL = 'http://localhost:3001/todos';

  // 讀取資料
  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('讀取失敗:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 新增
  const addItem = async () => {
    if (!inputValue.trim()) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue })
      });

      setInputValue('');
      fetchItems();
    } catch (error) {
      console.error('新增失敗:', error);
    }
  };

  // 刪除
  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      fetchItems();
    } catch (error) {
      console.error('刪除失敗:', error);
    }
  };

  // 開始編輯
  const startEdit = (item) => {
    setEditId(item.id);
    setEditValue(item.text);
  };

  // 儲存修改
  const saveEdit = async () => {
    if (!editValue.trim()) return;

    try {
      await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editValue })
      });

      setEditId(null);
      setEditValue('');
      fetchItems();
    } catch (error) {
      console.error('修改失敗:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="todo-card">
        <h2 className="todo-header">🗄️ SQLite 任務清單</h2>

        <div className="input-group">
          <input
            className="todo-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="請輸入新任務..."
          />
          <button className="add-btn" onClick={addItem}>新增</button>
        </div>

        <ul className="todo-list">
          {items.map(item => (
            <li className="todo-item" key={item.id}>
              {editId === item.id ? (
                <>
                  <input
                    className="todo-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                  />
                  <button className="btn btn-edit" onClick={saveEdit}>
                    儲存
                  </button>
                </>
              ) : (
                <>
                  <span className="todo-text">
                    {item.text} <small>(ID: {item.id})</small>
                  </span>
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => startEdit(item)}
                    >
                      修改
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      刪除
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;