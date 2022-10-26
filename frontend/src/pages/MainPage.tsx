import { Outlet } from "react-router-dom";
import Header from "../components/areas/Header";
import Main from "../components/areas/Main";
import MainTab from "../components/areas/MainTab";

export default function() {
  return (
    <>
      <Main/>
      <MainTab/>
    </>
  )
}