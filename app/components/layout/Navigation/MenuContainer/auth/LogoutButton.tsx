import { useRouter } from 'next/router';
import React, { FC, MouseEvent } from 'react';



import MaterialIcon from '@/components/ui/MaterialIcon';
import { useActions } from '@/hooks/useActions';


const LogoutButton:FC = () => {
  const {logout} = useActions()
  const router = useRouter()

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>)=> {
    e.preventDefault()
    logout();
	  router.replace('/');
  }
  return (
    <li>
      <a onClick={handleLogout}>
        <MaterialIcon name='MdLogout'/>
        <span>Logout</span>
      </a>
    </li>
  )
}

export default LogoutButton