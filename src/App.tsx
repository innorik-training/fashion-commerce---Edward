import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import SearchResults from "./components/search";
import Notfound from "./pages/404";
import About from "./pages/about";
import AddItem from "./pages/add";
import Allbags from "./pages/allbags";
import Allcategories from "./pages/allcategories";
import Category from "./pages/category";
import Home from './pages/home';
import Product from "./pages/product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home/>}/>

          {/* PRODUCT PAGE */}
          <Route path="/product/:id" element={<Product/>}/>

          {/* SEARCH RESULTS PAGE */}
          <Route path="/allbags" element={<SearchResults/>}/>

          {/* ALL BAGS */}
          <Route path="/allproducts/:category" element={<Allbags/>}/>

          {/* ADMIN PAGE */}
          <Route path="/add" element={<AddItem/>}/>

          {/* NOT FOUND */}
          <Route path="*" element={<Notfound/>}/>

          {/* ALL CATEGORIES */}
          <Route path="/categories" element={<Allcategories/>}/>

          {/*CATEGORY*/}
          <Route path="/categories/:category" element={<Category/>}/>

          {/*ABOUT*/}
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
