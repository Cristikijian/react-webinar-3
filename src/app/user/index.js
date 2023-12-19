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
  const select = useSelector(state => ({
    currentUser: state.auth.userInfo,
    userInfo: state.user.userInfo,
  }));

  useInit(() => {
    if (select.currentUser) {
      store.actions.user.getUserInfo(select.currentUser._id);
    }
  }, [select.currentUser]);

  const {t} = useTranslate();

  const callbacks = {
    //Logout
    deleteUserInfo: useCallback(() => store.actions.auth.deleteUserInfo(), [store]),
  }

  return (
    <PageLayout>
      <SignInBar t={t} userInfo={select.currentUser} deleteUserInfo={callbacks.deleteUserInfo}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {select.userInfo && <UserCard userInfo={select.userInfo} t={t}/>}
    </PageLayout>
  );
}

export default memo(User);