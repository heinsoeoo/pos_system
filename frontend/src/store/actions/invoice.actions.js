import { apiService } from "../../services";
import { invoiceConstants } from "../constants"

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

const unixToDate = (unixTime) => {
    return new Date(parseInt(unixTime)).toLocaleDateString();
}

const createInvoice = reqData => {
    return async (dispatch) => {
        try {
            const response = await apiService.call('post', 'invoice', reqData);
            const {data} = response;
            const invoice = {...data, key: data.id};
            dispatch(addInvoice(invoice));
        } catch (err) {
            dispatch(addInvoice({}));
        }
    }
}

export const invoiceActions = {
    setInvoices,
    setInvoice,
    addInvoice,
    removeInvoice,
    getInvoices,
    createInvoice
}