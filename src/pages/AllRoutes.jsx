import { Route, Routes } from "react-router-dom";
// import { PrivateRoute } from "../Components/PrivateRoute";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import AddProductPage from "./AddProductPage";
import ProductPage from "./ProductPage";



const AllRoutes = () => {
  return <Routes>
    <Route path="/" element={<SignupPage />}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/addProductPage" element={<AddProductPage />}/>
    <Route path="/productPage" element={<ProductPage />}/>
    {/* <Route path="/editProduct/:productId" element={<AddEditProductPage />} /> */}
    {/* <Route path="/student/:id" element={<PrivateRoute><StudentDetail /></PrivateRoute>}/> */}
  </Routes>;
};

export default AllRoutes
