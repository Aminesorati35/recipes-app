import React, { Children, useEffect } from 'react'
import AdminNavbar from '../AdminNavbar';
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router';

const AdminLayout = ({children}) => {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  useEffect(()=>{
    if(!isAuthenticated){
        navigate('/login')
    }
  },[])
  return (
    <div className='w-full ' >
        <AdminNavbar/>
      <div className='flex items-center justify-center mt-5 ml-15 xl:ml-80  ' >{children}</div>
    </div>
  )
}

export default AdminLayout;