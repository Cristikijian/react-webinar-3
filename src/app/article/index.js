import { memo, useCallback } from 'react';
import { useParams } from "react-router-dom";
import ArticleCard from "../../components/article-card";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import SignInBar from '../../components/signin-bar';
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    userInfo: state.auth.userInfo,
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    //Разлогин пользователя
    deleteUserInfo: useCallback(() => store.actions.auth.deleteUserInfo(), [store]),
  }

  return (
    <PageLayout>
      <SignInBar t={t} userInfo={select.userInfo} deleteUserInfo={callbacks.deleteUserInfo}/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
