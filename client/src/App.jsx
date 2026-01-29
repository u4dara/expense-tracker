import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Transactions from './pages/Transactions';
import Trends from './pages/Trends';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Routes that use common layout with Navbar */}
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/trends' element={<Trends />} />
        </Route>

        {/* Routes that do not use Navbar */}
        <Route element={<AuthLayout />}>
          <Route path='/auth/sign-up' element={<SignUp />} />
          <Route path='/auth/sign-in' element={<SignIn />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
