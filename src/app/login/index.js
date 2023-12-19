import { memo, useCallback } from "react";
import Head from "../../components/head";
import LoginForm from "../../components/login-form";
import PageLayout from "../../components/page-layout";
import SignInBar from "../../components/signin-bar";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

/**
 * Страница входа
 */
function Login() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    userInfo: state.user.userInfo,
    isAutorize: state.user.isAutorize,
    error: state.user.error
  }));

  const callbacks = {
    // Добавление в корзину
    loginUser: useCallback((username, password) => store.actions.user.loginUser(username, password), [store]),
    //Разлогин пользователя
    deleteUserInfo: useCallback(() => store.actions.user.deleteUserInfo(), [store]),
  }

  return (
    <PageLayout>
      <SignInBar t={t} userInfo={select.userInfo} deleteUserInfo={callbacks.deleteUserInfo}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
        <LoginForm t={t} onLogin={callbacks.loginUser} isAutorize={select.isAutorize} error={select.error}/>
    </PageLayout>
  );
}

export default memo(Login);
