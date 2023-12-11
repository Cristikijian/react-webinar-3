import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import Item from "../../components/item";
import List from "../../components/list";
import PageLayout from "../../components/page-layout";
import Pages from '../../components/pages';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Main() {

  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //открытие карточки товара
    openItemCard: useCallback((id) => navigate(`/items/${id}`)),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} onOpen={callbacks.openItemCard}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      { select.list.length > 0 && <Pages/> }
    </PageLayout>
  );
}

export default memo(Main);
