import { useEffect, useState } from "react";
import Routes from './Routes'
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          //console.log(res);
          setUid(res.data);
        })
        .catch((errr) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);


  return (
    <UidContext.Provider value={uid}>
     <Routes uid={uid}/>
    </UidContext.Provider>
  );
}

export default App;
