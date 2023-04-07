
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Home} from "./pages/home";
import {Wishlist} from "./pages/wishlist";
import {LoginPage} from "./pages/login";
import {SignUpPage} from "./pages/sign_up";
import {Navbar} from "./components/new_navbar.js";

function App() {

  return (
    <div className="App"> 
    
    <Router>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/wishlist" element={<Wishlist/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/sign_up" element={<SignUpPage/>} />
    </Routes>     
    </Router> 
      
    </div>

  );
}

export default App;

