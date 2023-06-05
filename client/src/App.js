import React from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";

const router = createBrowserRouter([{ path: "*", Component: Root }]);
const App = () => {
  return <RouterProvider router={router} />;
};
function Root() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default App;
