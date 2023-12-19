import { memo, useCallback } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import SignInBar from "../../components/signin-bar";
import UserCard from "../../components/user-card";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function User() {
  const store = useStore();

  useInit(() => {
    store.actions.user.getUserInfo();
  }, []);

  const select = useSelector(state => ({
    userInfo: state.user.userInfo,
    article: state.article.data,
  }));

  console.log(select.userInfo, 'userInfo in user');

  const {t} = useTranslate();

  const callbacks = {
    //Logout
    deleteUserInfo: useCallback(() => store.actions.user.deleteUserInfo(), [store]),
  }

  return (
    <PageLayout>
      <SignInBar t={t} userInfo={select.userInfo} deleteUserInfo={callbacks.deleteUserInfo}/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
        <UserCard userInfo={select.userInfo} t={t}/>
    </PageLayout>
  );
}

export default memo(User);