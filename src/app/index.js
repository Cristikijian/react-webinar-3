import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ItemInfo from './item-info';
import Main from "./main";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/items/:id',
    element: <ItemInfo />,
  }
]);

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
