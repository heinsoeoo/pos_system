import './App.css';
import { Fragment, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './routers/PrivateRoutes';
import { PublicRoutes } from './routers/PublicRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';
import routes from './routes';
import { useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import Loading from './pages/Loading';

function App() {
  const auth = useSelector((state) => state.auth);
  const getRoutes = () => routes.map((route) => {
    return <Route exact path={route.path} element={route.component} key={route.key} />
  })

  return (
    <Fragment>
      <Suspense fallback={<Loading/>}>
      <CssBaseline />
      <Routes>
        <Route element={<PrivateRoutes/>}>
          {getRoutes(routes)}
        </Route>
        <Route element={<PublicRoutes/>} >
          <Route path='/login' element={<Login />}/>
        </Route>
        <Route path='/' element={<Navigate to='/app' replace/>}/>
        <Route path='/404' element={<NotFound />}/>
        <Route path='*' element={<Navigate to='/404' replace/>}/>
      </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
