import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/header/Header";
import MainLayout from "./components/layout/MainLayout";
import News from "./components/pages/News";
import Layout from "./components/layout/Layout";
import NewsDetail from "./components/pages/NewsDetail";
import Footer from "./components/footer/Footer";
import ContactUs from "./components/pages/ContactUs";
import Career from "./components/pages/Career";
import CareerDetail from "./components/pages/CareerDetail";
import WhoWeAre from "./components/about-us/WhoWeAre";
import MissionVision from "./components/about-us/MissionVision";
import History from "./components/about-us/History";
import AmoTrade from "./components/companies/AmoTrade";
import AmoGrow from "./components/companies/AmoGrow";
import AmoDo from "./components/companies/AmoDo";
import AmoTransport from "./components/companies/AmoTransport";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/newsDetail" element={<NewsDetail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/career" element={<Career />} />
            <Route path="/careerDetail" element={<CareerDetail />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/mission-vision" element={<MissionVision />} />
            <Route path="/history" element={<History />} />
            <Route path="/companies/amo-trade" element={<AmoTrade />} />
            <Route path="/companies/amo-grow" element={<AmoGrow />} />
            <Route path="/companies/amo-do" element={<AmoDo />} />
            <Route path="/companies/amo-transport" element={<AmoTransport />} />
          </Route>
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
