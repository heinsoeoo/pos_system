// import Invoices from "./pages/invoices/Invoices";
// import CreateInvoice from './pages/invoices/CreateInvoice';
import React from "react";

const Invoices = React.lazy(() => import("./pages/invoices/Invoices"));
const CreateInvoice = React.lazy(() => import('./pages/invoices/CreateInvoice'));
const InvoiceDetail = React.lazy(() => import('./pages/invoices/InvoiceDetail'));

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
    },
    {
        name: "Invoice Detail",
        key: "invoice-detail",
        path: "/invoice/:id",
        component: <InvoiceDetail/>
    }
];

export default routes;