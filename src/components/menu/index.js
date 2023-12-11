import { cn as bem } from '@bem-react/classname';
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

function Menu() {
  const navigate = useNavigate();
  const cn = bem('Menu');

  return <div className={cn()}>
    <a className={cn('link')} onClick={() => navigate('/')}>Главная</a>
  </div>;
}

export default memo(Menu);