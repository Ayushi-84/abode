import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    padding: 5,
    marginTop: 30,
    background: "#dfe6e9",
    margin: 20,
    // width:'45%'
  },
  heading: {
    fontWeight: "bold",
    padding: 5,
    fontSize: 24,
  },
  editRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editSubdiv: {
    padding: 20,
    marginTop: 30,
    margin: 20,
  },
  messageStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#3ae374",
    padding: 10,
    fontSize: 20,
  },
});
export default useStyles;
