import React from 'react';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import SignLayout from './pages/authentication/signLayout';
import SignIn from './pages/authentication/signin';
import SignUp from './pages/authentication/signup';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignLayout />}>
          <Route index element={<SignIn />} ></Route>
          <Route path="/sign-up" element={<SignUp />} ></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
