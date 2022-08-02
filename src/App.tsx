import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import SignLayout from "./pages/authentication/signLayout";
import SignIn from "./pages/authentication/signin";
import SignUp from "./pages/authentication/signup";
import HomeLayout from "./pages/home/homeLayout";

export const UserContext = React.createContext({
  userVal: {},
  setUserVal: () => {},
});

function App() {
  const [userVal, setUserVal] = useState({});
  const value: any = {
    userVal,
    setUserVal
  }

  return (
    <HashRouter>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<SignLayout />}>
            <Route index element={<SignIn />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
          </Route>
          <Route path="/home" element={<HomeLayout />}></Route>
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
