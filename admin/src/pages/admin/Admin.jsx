// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Admin.css'
import Sidebar from '../../components/sidebar/Sidebar'
import AddProduct from '../../components/addproduct/AddProduct'
import {Routes,Route} from  'react-router-dom'
import ListProduct from '../../components/listproduct/ListProduct'
const Admin = () => {
  return (
    <div className="admin">
    <Sidebar />
    <Routes>
      <Route path='/addproduct' element={<AddProduct/>} />
      <Route path='/LISTproduct' element={<ListProduct/>} />
    </Routes>
    </div>
  )
}

export default Admin