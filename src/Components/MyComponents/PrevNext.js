import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { postData } from "../Api/ServerServices";
export default function PrevNext(props) {
  var navigate = useNavigate();

  const handleSave = async () => {
    var body = props.data;
    alert(body.opr)
    if (body.opr == "ADD_VENDOR_PICTURES") {
      var picture = body.pictures;

      var getFiles =picture.files;
      

      var formData = new FormData();
      formData.append("mobileno", body.mobileno);
      formData.append("oldpicture", picture.oldpicture);
      getFiles.map((item, index) => {
        formData.append("picture" + index, item);
      });
      var result = await postData(
        "vendor/update_vendor_properties_picture",
        formData,
        true
      );
      if (result.status) {
        alert("success");
        navigate(props.nextUrl);
      } else {
        alert("Fail");
      }
    } else {
      var body = props.data;
      var result = await postData("vendor/update_vendor_properties", body);
      if (result.status) {
        alert("success");
        navigate(props.nextUrl);
      } else {
        alert("Fail");
      }
    }
  };

  return (
    <div>
      <Divider />
      <div
        style={{
          margin:'10px 30px 10px 30px',
           
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            onClick={() => navigate(props.backUrl)}
            variant="contained"
            style={{
              textTransform: "capitalize",
              background: "#000",
              color: "#FFF",
            }}
          >
            Back
          </Button>
        </div>
        <div>
          <Button
            onClick={() => handleSave()}
            variant="contained"
            style={{
              textTransform: "capitalize",
              background: "#000",
              color: "#FFF",
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
