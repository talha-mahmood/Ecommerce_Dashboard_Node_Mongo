import './App.css';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Signup from './components/Signup';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './components/Login';
import AddProducts from './components/AddProducts';
import ProductList from './components/ProductList';
import UpdateProducts from './components/UpdateProducts';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<ProtectedRoutes ><ProductList /></ProtectedRoutes>}></Route>
        <Route path='/create' element={<ProtectedRoutes ><AddProducts /></ProtectedRoutes>}></Route>
        <Route path='/update/:id' element={<ProtectedRoutes ><UpdateProducts /></ProtectedRoutes>}></Route>
        <Route path='/profile' element={<ProtectedRoutes ><Profile /></ProtectedRoutes>}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
