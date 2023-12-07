import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const navigate = useNavigate();
  const cn = bem('BasketTool');
  const callbacks =  {
    goToMain: useCallback(() => navigate('/')),
  }
  return (
    <div className={cn()}>
      <div className={cn('go-to-main')}><a className="link" onClick={callbacks.goToMain}>Главная</a></div>
      <div>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
