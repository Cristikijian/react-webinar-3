import { cn as bem } from '@bem-react/classname';
import React from "react";
import { useMoneyFormatter } from '../../hooks/useMoneyFormatter';
import './style.css';

function Basket ({basket, showModal, closeModal, deleteItem }) {

  const formatter = useMoneyFormatter();

  const cn = bem('Basket');

  const basketSum = basket.reduce((acc, item) => {
    return (item.price * item.count) + acc;
  }, 0);

  return (
    <div className={cn('overlay', {visible: showModal})}>
      <div className={cn('modal')}>
        <div className={cn('head')}>
            <h1 className={cn('title')}>Корзина</h1>
            <button type='button' className={cn('button')} onClick={closeModal}>Закрыть</button>
        </div>
        {basket.length === 0 && <div className={cn('empty')}>Корзина пуста</div>}
        {basket.length > 0 && <div>
            { basket.map(item =>
              <div key={item.code} className={cn('item')}>
                <div className={cn('item-code')}>{item.code}</div>
                  <div className={cn('item-title')}>
                    {item.title}
                  </div>
                  <div className={cn('item-price')}>{`${formatter.format(item.price)}`}</div>
                  <div className={cn('item-count')}>{`${item.count} шт`}</div>
                  <div className={cn('item-button')}>
                    <button onClick={() => deleteItem(item.code)}>
                      Удалить
                    </button>
                  </div>
              </div>
            )}
            <div className={cn('footer')}>
              <div><b>Итого</b></div>
              <div><b>{basketSum} ₽</b></div>
            </div>
        </div>}
      </div>
    </div> 
  );
}

export default Basket;