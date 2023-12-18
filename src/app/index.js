import { Route, Routes } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Article from "./article";
import Basket from "./basket";
import Login from './login';
import Main from "./main";
import User from './user';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={<User/>}/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
