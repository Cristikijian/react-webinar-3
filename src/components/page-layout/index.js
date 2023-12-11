import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import { memo } from "react";
import Basket from '../../app/basket';
import useSelector from '../../store/use-selector';
import './style.css';

function PageLayout({head, footer, children}) {

  const activeModal = useSelector(state => state.modals.name);
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('center')}>
        {children}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
      {activeModal === 'basket' && <Basket />} 
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);
