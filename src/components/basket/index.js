import React from "react";
import './style.css';

function Basket ({basket, showModal, closeModal, deleteItem }) {

  const basketSum = basket.reduce((acc, item) => {
    return (item.price * item.count) + acc;
  }, 0);

  const basketClassname = showModal ? 'Basket-modal Modal-close' : 'Basket-modal';

  return (
    <div className={basketClassname}>
      <div className='Basket'>
        <div className='Basket-head'>
            <h1 className='Basket-title'>Корзина</h1>
            <button type='button' className='Basket-button' onClick={closeModal}>Закрыть</button>
        </div>
        {basket.length === 0 && <div className="Basket-empty">Корзина пуста</div>}
        {basket.length > 0 && <div className="Busket-list">
            { basket.map(item =>
              <div key={item.code} className='Basket-item'>
                <div className='Basket-item-code'>{item.code}</div>
                  <div className='Basket-item-title'>
                    {item.title}
                  </div>
                  <div className='Basket-item-price'>{`${item.price} ₽`}</div>
                  <div className='Basket-item-count'>{`${item.count} шт`}</div>
                  <div className="Basket-item-button">
                    <button onClick={() => deleteItem(item.code)}>
                      Удалить
                    </button>
                  </div>
              </div>
            )}
            <div className="Basket-footer">
              <div><b>Итого</b></div>
              <div><b>{basketSum} ₽</b></div>
            </div>
        </div>}
      </div>
    </div> 
  );
}

export default Basket;