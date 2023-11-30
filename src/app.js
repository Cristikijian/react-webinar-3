import React, { useCallback } from 'react';
import Basket from './components/basket';
import BasketInfo from "./components/basketInfo";
import Head from "./components/head";
import List from "./components/list";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, basket, showModal} = store.getState();

    const onAddItem = useCallback((code) => {
      store.addItem(code);
    }, [store]);

    const openModal = useCallback(() => {
      store.openModal();
    }, [store]);

    const closeModal = useCallback(() => {
      store.closeModal();
    }, [store]);

    const deleteItem = useCallback((code) => {
      store.deleteItem(code);
    }, [store]);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketInfo basket={basket} showModal={showModal} openModal={openModal}/>
      <List list={list} onAddItem={onAddItem}/>
      <Basket basket={basket} showModal={showModal} closeModal={closeModal} deleteItem={deleteItem}/>
    </PageLayout>
  );
}

export default App;
