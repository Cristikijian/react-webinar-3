import { memo, useCallback } from 'react';
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import SignInBar from '../../components/signin-bar';
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from '../../hooks/use-selector';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    userInfo: state.user.userInfo,
  }));

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.getCategories();
  }, [], true);

  const {t} = useTranslate();

  const callbacks = {
    //Logout
    deleteUserInfo: useCallback(() => store.actions.user.deleteUserInfo(), [store]),
  }

  return (
    <PageLayout>
      <SignInBar t={t} userInfo={select.userInfo} deleteUserInfo={callbacks.deleteUserInfo}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
