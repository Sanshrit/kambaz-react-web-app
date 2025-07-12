import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
export default function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          {/* <Route path="/" element={<Navigate to="Kambaz" />} /> */}
          <Route path="/" element={<Navigate to="LandingPage" />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
        </Routes>
      </div>
    </HashRouter>
);}
