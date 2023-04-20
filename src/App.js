import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/Administrator/Login/AdminLogin";
import DashBoard from "./Components/Administrator/Login/DashBoard";
import VendorSplashScreen from "./Components/Vendors/VendorSplashScreen";
import OtpComponent from "./Components/MyComponents/OtpComponent";
import VendorPropertiesSplashScreen from "./Components/Vendors/VendorPropertiesSplashScreen";
import VendorNavigation from "./Components/MyComponents/VendorNavigation";
import VendorSubPropertiesSplashScreen from "./Components/Vendors/VendorSubPropertiesSplashScreen";
import ThirdPage from "./Components/Vendors/ThirdPage";
import VendorAddress from "./Components/Vendors/VendorAddress";
import PlusMinus from "./Components/MyComponents/PlusMinus";
import Guest from "./Components/Vendors/Guest";
import VendorAmenities from "./Components/Vendors/VendorAmenities";
import UploadVendorPicture from "./Components/Vendors/UploadVendorPicture";
import VendorExtraDetails from "./Components/Vendors/VendorExtraDetails";
import Home from "./Components/UserInterface/Home";
function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<DashBoard />} path="/dashboard/*" />
          <Route element={<VendorSplashScreen />} path="/vendorsplashscreen" />
          <Route element={<OtpComponent />} path="/otpcomponent" />
          <Route
            element={<VendorPropertiesSplashScreen />}
            path="/vendorproperties"
          />
          <Route
            element={<VendorSubPropertiesSplashScreen />}
            path="/vendorsubproperties"
          />
          <Route element={<ThirdPage />} path="/thirdpage" />

          <Route element={<VendorNavigation />} path="/vn" />
          <Route element={<VendorAddress />} path="/vendoraddress" />
          <Route element={<Guest />} path="/guest" />
          <Route element={<PlusMinus />} path="/plusminus" />
          <Route element={<VendorAmenities />} path="/vendoramenities" />
          <Route
            element={<UploadVendorPicture />}
            path="/uploadvendorpicture"
          />
          <Route element={<VendorExtraDetails />} path="/vendorextradetails" />
          <Route element={<Home />} path="/home" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
