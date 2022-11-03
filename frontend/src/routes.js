import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from './pages/NotFound';
import PrivateRoutes from "./routers/PrivateRoutes";
import PublicRoutes from "./routers/PublicRoutes";

const routes = [
    {
        name: "Dashboard",
        key: "app",
        path: "/app",
        component: <Dashboard/>
    }
];

export default routes;

// export default function Router() {
//     const auth = useSelector((state) => state.auth);
  
//     return useRoutes([
//       {
//         path: "/app",
//         element: (
//           <PrivateRoutes auth={auth}>
//             <Suspense fallback={<div>Loading...</div>}>
//               <Dashboard />
//             </Suspense>
//           </PrivateRoutes>
//         ),
//         // children: [
//         //   { path: "create-invoice", element: <CreateInvoice /> },
//         //   { path: "show-invoices", element: <ShowInvoices /> },
//         // ],
//       },
//       {
//         path: "/login",
//         element: (
//           <PublicRoutes auth={auth}>
//             <Login />
//           </PublicRoutes>
//         ),
//       },
//       { path: "/", element: <Navigate to='/app' /> },
//       { path: "404", element: <NotFound /> },
//       { path: "*", element: <Navigate to='/404' /> },
//     ]);
//   }