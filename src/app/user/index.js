import { memo } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
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

  const {t} = useTranslate();

  const callbacks = {
    // 
    
  }

  return (
    <PageLayout>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
        <UserCard userInfo={select.userInfo} t={t}/>
    </PageLayout>
  );
}

export default memo(User);