import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './Pages/Login';
import MainPage from './Pages/Main';
import NotFoundPage from './Pages/NotFoundPage';
import ProductPage from './Pages/Product';
import SignUp from './Pages/Signup';
import VerifyEmailPage from './Pages/VerifyEmailPage';
import EditPage from './Pages/Edit';
import { PrivateRoute } from './routes/PrivateRoute';
import { ShoppingCartPage } from './Pages/ShoppingCart';

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
          <Route element={<EditPage />} path="/edit"></Route>
          <Route element={<PrivateRoute />}>
            <Route element={<ProductPage />} path="/products/:id"></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<ShoppingCartPage />} path="/checkout"></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
