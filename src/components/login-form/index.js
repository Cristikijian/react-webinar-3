import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './style.css';

function LoginForm({t, onLogin, isAutorize, error}) {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const cn = bem('LoginForm');
  const handleLogin = async (e) => {
    e.preventDefault();
    await onLogin(login, password);
  }

  useEffect(() => {
    if (isAutorize) {
      navigate('/profile');
    }
  }, [isAutorize]);

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('user.entering')}</h2>
      <form className={cn('form')} onSubmit={handleLogin}>
        <label htmlFor="login">{t('user.login')}</label>
        <input className={cn('input')} type="text" name="login" id="login" required onChange={e => setLogin(e.target.value)}></input>
        <label htmlFor="password">{t('user.password')}</label>
        <input className={cn('input')} type="text" name="password" id="password" required onChange={e => setPassword(e.target.value)}></input>
        {error && <div className={cn('error')}>{error}</div>}
        <button className={cn('button')} type="submit">{t('user.enter')}</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func
};

LoginForm.defaultProps = {
  t: (text) => text
}

export default memo(LoginForm);