import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import About from '../pages/Abouts/About'
import Contact from '../pages/Contact/Contact'
import Database from '../pages/Database/Database'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ContactSend from '../pages/ContactSend/ContactSend'
import ContactDetail from '../pages/ContactDetail/ContactDetail'
import ChartPage from '../pages/Chart/Chart'
import MyGrid from '../pages/MyGrid/MyGrid'

function App() {

    return (
        <BrowserRouter>
            <Nav />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact/send" element={<ContactSend />} />
                <Route path="/contact/:id" element={<ContactDetail />} />
                <Route path="/database" element={<Database />} />
                <Route path="/database/:id" element={<Database />} />
                <Route path="/chart" element={<ChartPage />} />
                <Route path="/mygrid" element={<MyGrid />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App