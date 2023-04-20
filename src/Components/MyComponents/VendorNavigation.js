import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { postData } from "../Api/ServerServices";
export default function VendorNavigation(props) {
  var navigate = useNavigate();

  const handleSave = async () => {
    var body = props.data;
    var result = await postData("vendor/update_vendor_properties", body);
    if (result.status) {
      alert("success");
      navigate("/vendorsplashscreen");
    } else {
      alert("Fail");
    }
  };

  return (
    <div
      style={{
        margin:'10px 30px 10px 30px',
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "20%",
          background: "#F7F6F2",
          borderRadius: 5,
          padding: 5,
          fontWeight: "bold",
        }}
      >
        {props.vendorName}
      </div>
      <div
        style={{
          width: "80%",
          flexDirection: "row",
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
        }}
      >
        <div style={{ padding: 10 }}>
          <Button
            style={{
              textTransform: "capitalize",
              background: "#F7F6F2",
              fontWeight: "bold",
              fontSize: 14,
              color: "#000",
              borderRadius: 5,
            }}
            onClick={() => navigate("/help")}
          >
            help
          </Button>
        </div>

        <div style={{ padding: 10 }}>
          <Button
            onClick={() => handleSave()}
            style={{
              textTransform: "capitalize",
              background: "#F7F6F2",
              fontWeight: "bold",
              fontSize: 14,
              color: "#000",
              borderRadius: 5,
            }}
          >
            Save and exit
          </Button>
        </div>
      </div>
    </div>
  );
}
