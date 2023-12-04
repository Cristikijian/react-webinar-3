import PropTypes from 'prop-types';
import React from "react";
import { useMoneyFormatter } from '../../hooks/useMoneyFormatter';
import { plural } from '../../utils';
import './style.css';

function BasketInfo({basket, openModal}) {

  const formatter = useMoneyFormatter();

  const basketSum = basket.reduce((acc, item) => {
      return (item.price * item.count) + acc;
  }, 0);

  return (
    <div className='Basket-info'>
      <div className='Basket-info__panel'>
        <div>В корзине {basket.length === 0 && ' пусто'}</div>
        {basket.length > 0 && <div className='Basket-items__count'>
          <b>{basket.length} {plural(basket.length, {one: 'товар', few: 'товара', many: 'товаров'})} / {formatter.format(basketSum)} </b>
        </div>}
        <div><button type='button' className='Basket-info__button' onClick={openModal}>Перейти</button></div>
      </div>
    </div>
  )
}

BasketInfo.propTypes = {
  openModal: PropTypes.func,
  basket: PropTypes.array,
};

export default React.memo(BasketInfo);
