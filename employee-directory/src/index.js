import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/Home';
import InsertUser from './components/InsertUser';
import UpdateUser from './components/UpdateUser';
import TableView from './components/TableView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/TableView" element={<TableView/>}/>
        <Route path="update/:id" element={<UpdateUser/>}/>
        <Route path="/insert" element={<InsertUser/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

