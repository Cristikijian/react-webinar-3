import { cn as bem } from '@bem-react/classname';
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import ItemCard from '../../components/item-card';
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import './style.css';

function ItemInfo () {
  const store = useStore();
  const params = useParams();

  useEffect(() => {
      store.actions.catalogItem.load(params.id);
  }, [])

  const cn = bem('ItemInfo');

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemInfo: state.catalogItem.itemInfo,
  }));

  const itemData = select.itemInfo;

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return <PageLayout>
    <Head title={itemData ? itemData.title : 'Название товара'}/>
    
    <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
    
    {itemData ? <ItemCard item={itemData} onAddToBasket={callbacks.addToBasket} /> : <div className={cn('empty-card')}>Loading...</div>}
  </PageLayout>
};

export default ItemInfo;