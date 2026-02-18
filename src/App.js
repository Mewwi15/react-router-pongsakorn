import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Student from "./Student"; // ไฟล์หน้าหลักเดิมของคุณ
import Education from "./pages/Education";
import Activity from "./pages/Activity";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TCTForm from "./pages/TCTForm";

function App() {
  return (
    <Router>
      {/* Navbar จะแสดงอยู่ทุกหน้า */}
      <Navbar />

      {/* Routes จัดการเนื้อหาตาม URL */}
      <Routes>
        <Route path="/" element={<Student />} />{" "}
        {/* หน้าหลัก (มี Hero และ Modal ของเดิม) */}
        <Route path="/education" element={<Education />} /> {/* หน้าการศึกษา */}
        <Route path="/activity" element={<Activity />} /> {/* หน้ากิจกรรม */}
        <Route path="/contact" element={<Contact />} /> {/* หน้าติดต่อ */}
        <Route path="/tct-form" element={<TCTForm />} />
        {/* URL อื่นๆ ที่ไม่มีข้างบน จะวิ่งมาที่หน้านี้ (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
