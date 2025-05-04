import {Routes, Route} from 'react-router-dom';
import ProductList from "./components/ProductList"
import ProductDetail from "./components/ProductDetail";
import CartPage from './pages/CartPage';

function App() {

  return (
   <div>
    <h1>EC Site</h1>
    <Routes>
      <Route path='/' element={<ProductList />} />
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
   </div>
  );
}

export default App
