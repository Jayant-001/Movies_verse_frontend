import { useEffect } from 'react'
import { getCookie, removeCookie } from '../cookie/cookie'
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const cookie = getCookie();
    const navigate = useNavigate();

    useEffect(() => {
        if(cookie) {
            removeCookie();
            navigate('/')
        }
        else {
            navigate('/login');
        }
    }, []);
  return ;
}

export default Auth