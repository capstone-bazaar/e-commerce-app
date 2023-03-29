import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './Pages/Login';
import MainPage from './Pages/Main';
import NotFoundPage from './Pages/NotFoundPage';
import ProductPage from './Pages/Product';
import ProductsPage from './Pages/ProductPage';
import SignUp from './Pages/Signup';
import VerifyEmailPage from './Pages/VerifyEmailPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { ShoppingCartPage } from './Pages/ShoppingCart';
import OrdersPage from './Pages/OrdersPage';
import UserProfile from './Pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LoginPage />} path="/login"></Route>
          <Route element={<MainPage />} path="/"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<VerifyEmailPage />} path="/verification" />
          <Route element={<NotFoundPage />} path="*" />
          <Route element={<PrivateRoute />}>
            <Route element={<ProductPage />} path="/products/:id"></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<ShoppingCartPage />} path="/checkout"></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<OrdersPage />} path="/orders"></Route>
          </Route>
          <Route element={<ProductsPage />} path="/product"></Route>
          <Route element={<UserProfile />} path="/profile"></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
