import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ItemInfo from '../components/itemInfo';
import useSelector from "../store/use-selector";
import Basket from "./basket";
import Main from "./main";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: 'items/:id',
      element: <ItemInfo />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
