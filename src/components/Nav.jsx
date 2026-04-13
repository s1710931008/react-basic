import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Nav.css'

const NAV_ICONS = {
  '/': <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5L8 2l6 4.5V14H2V6.5z" /><path d="M6 14V9h4v5" /></svg>,
  '/about': <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="5" r="2.5" /><path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" /></svg>,
  '/contact': <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="12" height="9" rx="1.5" /><path d="M2 5l6 5 6-5" /></svg>,
  '/contact/send': <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2L2 7l4.5 1.5M14 2l-5 12-2.5-5.5M14 2L6.5 8.5" /></svg>,
  '/sendmsg': <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h12v8H8.5L5 14v-3H2V3z" /></svg>,
  '/database': <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="8" cy="4.5" rx="5" ry="2" /><path d="M3 4.5v3c0 1.1 2.24 2 5 2s5-.9 5-2v-3" /><path d="M3 7.5v3c0 1.1 2.24 2 5 2s5-.9 5-2v-3" /></svg>,
  '/chart': <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12l3.5-4 3 2.5L12 5" /><path d="M2 14h12" /></svg>,
}

function useDevice() {
  const [device, setDevice] = useState('desktop')
  useEffect(() => {
    const handleResize = () => setDevice(window.innerWidth < 768 ? 'mobile' : 'desktop')
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return device
}

export default function Nav() {
  const device = useDevice()
  const location = useLocation()

  const webMenu = [
    {
      title: '主要頁面',
      items: [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ]
    },
    {
      title: '功能頁面',
      items: [
        { to: '/contact/send', label: 'Contact Send' },
        { to: '/sendmsg', label: 'Send Message' },
        { to: '/database', label: 'Database' },
        { to: '/chart', label: 'Chart' },
      ]
    }
  ]

  const mobileMenu = [
    { to: '/', label: '首頁', icon: '🏠' },
    { to: '/about', label: '關於', icon: 'ℹ️' },
    { to: '/contact', label: '聯絡', icon: '📞' },
    { to: '/database', label: '資料', icon: '🗄️' },
    { to: '/chart', label: '圖表', icon: '📊' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname === to

  if (device === 'mobile') {
    return (
      <>
        <nav className="mobile-nav">
          {mobileMenu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={isActive(item.to) ? 'active' : ''}
            >
              <div className="mobile-icon-wrap">
                <span className="mobile-icon">{item.icon}</span>
              </div>
              <span className="mobile-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </>
    )
  }

  return (
    <>
      <nav className="web-nav">
        <div className="web-nav-logo">
          <div className="web-nav-logo-mark">
            <svg viewBox="0 0 14 14" fill="white">
              <rect x="1" y="1" width="5" height="5" rx="1" />
              <rect x="8" y="1" width="5" height="5" rx="1" />
              <rect x="4.5" y="8" width="5" height="5" rx="1" />
            </svg>
          </div>
          <span className="web-nav-logo-name">My App</span>
        </div>

        {webMenu.map((group, gi) => (
          <div key={group.title} className="web-nav-group">
            {gi > 0 && <div className="web-nav-divider" />}
            <div className="group-title">{group.title}</div>
            <div className="group-links">
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={isActive(item.to) ? 'active' : ''}
                >
                  <span className="web-nav-icon">{NAV_ICONS[item.to]}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  )
}