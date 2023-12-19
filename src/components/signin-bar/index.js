import { cn as bem } from '@bem-react/classname';
import { Link, useNavigate } from "react-router-dom";
import './style.css';

function SignInBar ({t, userInfo, deleteUserInfo}) {
  const navigate = useNavigate()
  const cn = bem('SignInBar');
  
  const logout = async () => {
      await deleteUserInfo();
      localStorage.removeItem('token');
      navigate('/login');
  }

  return (
      <div className={cn()}>
          {localStorage.getItem('token') ? <>
          {userInfo && <Link to='/profile'>{userInfo.username}</Link>}
          <button className={cn('logout-button')} onClick={logout}>{t('user.logout')}</button>
          </>
          :
          <Link to='/login'><button className={cn('login-button')}>{t('user.enter')}</button></Link>
          }
      </div>
  );
};

export default SignInBar;