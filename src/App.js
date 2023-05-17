import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// components
import { NavBar } from './components/navBar/NavBar';

// pages 
import Home from './pages/home/Home'
import AddProduct from './pages/create/AddProduct'
import EditProduct from './pages/edit/EditProduct'
import ProductDetail from './pages/single/ProductDetail';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="wraper">
        <Routes>
          <Route exact path='/' element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path='/product-details/:id' element= {user ? <ProductDetail /> : <Navigate to="/login" />} />
          <Route path='/add-product' element={user ? <AddProduct /> : <Navigate to="/login" />} />
          <Route path='/edit-product/:id' element= {user ? <EditProduct /> : <Navigate to="/login" /> } />
          <Route  path='/login' element={ !user ? <Login /> : <Navigate to="/" />} />
          <Route  path='/signup' element={ !user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
