import { useState } from 'react'
import { postA2 } from '../../api/contact'
import './ContactSend.css'


export default function ContactSend() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [msg, setMsg] = useState('')

    const handleSubmit = async () => {
        if (!name || !phone || !msg) {
            alert('請填寫完整資料')
            return
        }

        const phoneRegex = /^09\d{8}$/
        if (!phoneRegex.test(phone)) {
            alert('請輸入正確的手機號碼')
            return
        }

        try {
            const res = await postA2({ name, phone, msg })
            console.log(res.data)

            alert('送出成功 👍')
            setName('')
            setPhone('')
            setMsg('')
        } catch (error) {
            console.error(error)
            alert('送出失敗')
        }
    }

    return (
        <div className="contact-page">
            <div className="contact-card">
                <h1 className="contact-title">聯絡我們</h1>
                <p className="contact-subtitle">請填寫以下資訊，我們會盡快與您聯繫</p>

                <div className="form-group">
                    <label>姓名</label>
                    <input
                        type="text"
                        placeholder="請輸入姓名"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>電話</label>
                    <input
                        type="text"
                        placeholder="請輸入電話 (09xxxxxxxx)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    />
                </div>

                <div className="form-group">
                    <label>訊息</label>
                    <textarea
                        placeholder="請輸入您的訊息"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        rows={5}
                    />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                    送出
                </button>
            </div>
        </div>
    )
}