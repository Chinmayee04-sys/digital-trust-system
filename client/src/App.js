import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddComplaint from "./pages/AddComplaint";
import ComplaintDetails from "./pages/ComplaintDetails";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/citizen" element={<CitizenDashboard />} />
      <Route path="/authority" element={<AuthorityDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/add-complaint" element={<AddComplaint />} />
      <Route path="/complaints/:id" element={<ComplaintDetails />} />

    </Routes>
  );
};

export default App;
