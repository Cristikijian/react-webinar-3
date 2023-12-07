import { cn as bem } from '@bem-react/classname';
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import BasketTool from "../basket-tool";
import Head from "../head";
import './style.css';

function ItemInfo () {
  const [itemData, setItemData] = useState();
  const store = useStore();
  const params = useParams();

  useEffect(() => {
    async function fetchData () {
      const response = await fetch(`/api/v1/articles/${params.id}?fields=*,madeIn(title,code),category(title)`);
      return response.json();
    }
    fetchData().then((data) => {
      setItemData(data.result)});
      return;
  }, [])

  const cn = bem('ItemInfo');

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  console.log('itemData',itemData);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return <PageLayout>
      {itemData && <Head title={itemData.title}/>}
      {!itemData && <Head title='Название товара'/>}
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      {!itemData && <div className={cn('empty-card')}>Loading...</div>}
      {itemData && <div className={cn('card')}>
        <div className={cn('description')}>{itemData.description}</div>
        <div className={cn('country')}>Страна производитель: <b>{itemData.madeIn.title}</b></div>
        <div className={cn('category')}>Категория: <b>{itemData.category.title}</b></div>
        <div className={cn('edition')}>Год выпуска: <b>{itemData.edition}</b></div>
        <div className={cn('price')}><b>Цена: {itemData.price}</b></div>
        <div className={cn('button-container')}><button type='submit' className={cn('button')} onClick={() => callbacks.addToBasket(itemData._id)}>Добавить</button></div>
      </div>}   
  </PageLayout>
};

export default ItemInfo;