import { useEffect, useState, createRef, useRef } from "react";
import Header from "./Header";
import LastFooter from "./LastFooter";
import Footer from "./Footer";
import ViewComponent from "./ViewComponent";
import { postData, getData, serverURL } from "../Api/ServerServices";
import StateHeader from "./StateHeader";
export default function Home(props) {
  const [cities, setCities] = useState([]);
  const getAllCities = async (state_city) => {
    var body = { state_city: state_city };
    var result = await postData("users/displayallcities", body);
    setCities(result.data);
  };
  useEffect(function () {
    getAllCities("");
  }, []);

  const showAllCities = () => {
    return cities.map((item) => {
      return <ViewComponent pictures={item.picture} data={item} />;
    });
  };

  const searchingCityState = (city_state) => {
    getAllCities(city_state);
  };

  return (
    <div>
      <Header searchfn={searchingCityState} />
      <StateHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {showAllCities()}
      </div>
      <Footer />
      <LastFooter />
    </div>
  );
}
