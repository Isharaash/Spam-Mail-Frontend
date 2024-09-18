
import React, { useState } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import RegisterPage from './Components/RegisterPage';
import LoginPage from "./Components/LoginPage";

import UserPage from "./Components/UserPage";


function App() {
  const [userId, setUserId] = useState(null);


  return (
    <div>
      <BrowserRouter>
      <Routes>
<Route path="/registerPage" element={<RegisterPage/>}></Route>
<Route path="/" element={<LoginPage setUserId={setUserId} />}></Route>
<Route path="/userPage" element={<UserPage id={userId}/>}></Route>


      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
