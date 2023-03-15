import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import ProductPage from './Pages/ProductPage';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './Pages/Login';
import MainPage from './Pages/Main';
import SignUp from './Pages/Signup';
import VerifyEmailPage from './Pages/VerifyEmailPage';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LoginPage />} path="/login"></Route>
          <Route element={<MainPage />} path="/"></Route>
          <Route element={<PrivateRoute />}></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<VerifyEmailPage />} path="/verification" />
          <Route element={<ProductPage />} path="/product"></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
