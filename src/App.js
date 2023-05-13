import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Link, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
   return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
