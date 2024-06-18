import React from "react";
import {Routes, Route}  from "react-router-dom"


import Home from "../components/home/Home";
import UserCrud from "../components/user/UserCrud";

export default function (props) {
   return <Routes>
        <Route exact path="home" element={<Home/>}></Route>
        <Route path="/users" element={<UserCrud/>}></Route>
        <Route path="*" element={<Home/>}></Route>
    </Routes>
}