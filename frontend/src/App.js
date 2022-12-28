import React from "react";
import NavbarMenu from "./components/navbar";
import Auth from "./components/Auth/auth";
import Home from "./components/home";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavbarMenu />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
