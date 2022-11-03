import Invoices from "./pages/invoices/Invoices";
import CreateInvoice from './pages/invoices/CreateInvoice';

const routes = [
    {
        name: "Invoices",
        key: "invoices",
        path: "/app",
        component: <Invoices/>
    },
    {
        name: "Create Invoice",
        key: "create-invoice",
        path: "/create-invoice",
        component: <CreateInvoice/>
    }
];

export default routes;