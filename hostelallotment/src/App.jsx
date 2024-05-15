import SignUpForm from './components/SignUp/SignUpForm'
import OTPVerification from './components/Otp/otp'
import LandingPage from './components/Landingpage/LandingPage';
import { Routes, Route } from "react-router-dom";
import HostelRoomAllotment from './components/roombooking/HostelRoomAllotment';
import HostelSelectionPage from './components/HostelSelection/HostelSelection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/otpverification" element={<OTPVerification />} />
      <Route path="/roomBooking" element={<HostelRoomAllotment />} />
      <Route path="/hostelSelection" element={<HostelSelectionPage/>} />
    </Routes>
  );
}

export default App;