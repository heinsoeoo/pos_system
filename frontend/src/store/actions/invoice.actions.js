import { apiService } from "../../services";
import { invoiceConstants } from "../constants"
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const setInvoices = invoices => ({
    type: invoiceConstants.GET_INVOICES,
    invoices
});

const setInvoice = invoice => ({
    type: invoiceConstants.GET_INVOICE,
    invoice
});

const addInvoice = invoice => ({
    type: invoiceConstants.CREATE_INVOICE,
    invoice
});

const removeInvoice = id => ({
    type: invoiceConstants.DELETE_INVOICE,
    id
});

const getInvoices = () => {
    return async (dispatch) => {
        try {
            const response = await apiService.call('get', 'invoices');
            const {data} = response;
            const invoices = data.map(inv => ({...inv, date: unixToDate(inv.date), key: inv.id}));
            dispatch(setInvoices(invoices));
        } catch (err) {
            dispatch(setInvoices([]));
        }
    }
};

const getInvoice = (id) => {
    return async (dispatch) => {
        try {
            const response = await apiService.call('get', `invoice/${id}`);
            const {data} = response;
            const invoice = {...data, date: unixToDate(data.date), key: data.id};
            dispatch(setInvoice(invoice));
        } catch (err) {
            dispatch(setInvoice({}));
        }
    }
};

const unixToDate = (unixTime) => {
    return new Date(parseInt(unixTime*1000)).toLocaleDateString();
}

const createInvoice = reqData => {
    return async (dispatch) => {
        try {
            const response = await apiService.call('post', 'invoice', reqData);
            const {data} = response;
            const invoice = {...data, key: data.id};
            toast.success("Invoice created successfully");
            dispatch(addInvoice(invoice));
        } catch (err) {
            dispatch(addInvoice({}));
            toast.error("Failed to create invoice");
        }
    }
}

const deleteInvoice = id => {
    return async (dispatch) => {
        try {
            await apiService.call('delete', `invoice/${id}`);
            dispatch(removeInvoice(id));
            toast.success("Invoice deleted successfully");
        } catch (err) {
            toast.error("Failed to delete invoice");
        }
    }
}

export const invoiceActions = {
    setInvoices,
    setInvoice,
    addInvoice,
    removeInvoice,
    getInvoices,
    createInvoice,
    getInvoice,
    deleteInvoice
}