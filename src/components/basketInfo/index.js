import PropTypes from 'prop-types';
import React from "react";
import { plural } from '../../utils';
import './style.css';

function BasketInfo({basket, openModal}) {

  const basketSum = basket.reduce((acc, item) => {
      return (item.price * item.count) + acc;
  }, 0);

  return (
    <div className='Basket-info'>
      <div className='Basket-info__panel'>
        <div>В корзине</div>
        <div className='Basket-items__count'><b> {basket.length} {plural(basketSum, {one: 'товар', few: 'товаров', many: 'товара'})} / {basketSum}₽ </b></div>
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
