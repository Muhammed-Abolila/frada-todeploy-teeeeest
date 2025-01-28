import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../../Redux/Actions/CitiesAction";
const GetSaudiCities = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const getCitiesFunc = async () => {
      try {
        await dispatch(getCities())
      } catch (e) {
        console.log(e);
      }
    };
    getCitiesFunc();
  }, []);
  const saudiCitiesRes = useSelector(state => state.CitiesReducer.Cities);
  let saudiCities = []
  try {
    if (saudiCitiesRes?.data) {
      saudiCities = saudiCitiesRes.data
    }
  } catch (e) {
    console.log(e);
  }
  return [saudiCities];
};
export default GetSaudiCities;