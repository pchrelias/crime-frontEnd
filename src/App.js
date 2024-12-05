import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './components/Register';
import QueryForm from './components/QueryForm';
// import NotFound from './pages/NotFound';
import AddCrimeReport from './components/AddCrimeReport';
import Login from './components/LoginPage';
// import PrivateRoute from './components/PrivateRoute';

const App = () => (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/query-form" element={<QueryForm />} />
          <Route path="/add-report" element={<AddCrimeReport />} />
        {/*<Route path="*" element={<NotFound />} />*/}
      </Routes>
    </Router>
);

export default App;
