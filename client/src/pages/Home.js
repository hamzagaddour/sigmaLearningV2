import React, {useContext} from "react";
import {UidContext} from '../components/AppContext'
import HomeWhenLogin from "../components/homeComponents/home/HomeWhenLogin";
import Intro from "../components/homeComponents/intro/Intro";

const Home = () => {
  const uid = useContext(UidContext);

  
  return (
    <>
       {uid && (
         <HomeWhenLogin/>
       )}
       {!uid && (
         <Intro/>
       )}
    </>
  );
};

export default Home;
