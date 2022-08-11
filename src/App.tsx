import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Main from './pages/Main';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { useEffect } from 'react';
import { store } from './store';

function App() {

  useEffect(() => {

    store.newAuthToken(localStorage.getItem('token') || '');

    return () => {
      localStorage.setItem('token', store.authToken)
    }
  }, [])

  return (
    
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/register' element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>

  );
}

export default App;
