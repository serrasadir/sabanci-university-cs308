
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Home} from "./pages/home";
import {CreateProduct} from "./pages/createproduct";
import {Wishlist} from "./pages/wishlist";
import {LoginPage} from "./pages/login";
import {SignUpPage} from "./pages/sign_up";
import {Navbar} from "./components/new_navbar.js";
import { Category } from "./pages/categories";
import { Products } from "./pages/product";
import ProductDetail from "./pages/productDetail";


function App() {

  return (
    <div className="App"> 
    
    <Router>
      <Navbar/>
    <Routes>
      
      <Route path="/" element={<Home/>} />
      <Route path="/wishlist" element={<Wishlist/>} />
      <Route path="/createproduct" element={<CreateProduct/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/sign_up" element={<SignUpPage/>} />
      <Route path="/categories" element={<Category/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/products/:productId" element={<ProductDetail/>} />
    </Routes>     
    </Router> 
      
    </div>

  );
}

export default App;

