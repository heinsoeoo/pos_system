import { apiService } from "../../services";
import { invoiceConstants } from "../constants"
import { statusActions } from './status.actions';

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
        dispatch(statusActions.setLoading());
        try {
            const response = await apiService.call('get', 'invoices');
            const {data} = response;
            const invoices = data.map(inv => ({...inv, date: unixToDate(inv.date), key: inv.id}));
            dispatch(setInvoices(invoices));
        } catch (err) {
            dispatch(setInvoices([]));
            dispatch(statusActions.setSuccess(false));
            dispatch(statusActions.setMessage("Failed to retrieve data"));
        }
        dispatch(statusActions.setLoading());
    }
};

const getInvoice = (id) => {
    return async (dispatch) => {
        dispatch(statusActions.setLoading());
        try {
            const response = await apiService.call('get', `invoice/${id}`);
            const {data} = response;
            const invoice = {...data, date: unixToDate(data.date), key: data.id};
            dispatch(setInvoice(invoice));
        } catch (err) {
            dispatch(setInvoice({}));
        }
        dispatch(statusActions.setLoading());
    }
};

const unixToDate = (unixTime) => {
    return new Date(parseInt(unixTime*1000)).toLocaleDateString();
}

const createInvoice = reqData => {
    return async (dispatch) => {
        dispatch(statusActions.setLoading());
        try {
            const response = await apiService.call('post', 'invoice', reqData);
            const {data} = response;
            const invoice = {...data, key: data.id};
            dispatch(addInvoice(invoice));
            dispatch(statusActions.setSuccess(true));
            dispatch(statusActions.setMessage("Invoice created successfully"));
        } catch (err) {
            dispatch(addInvoice({}));
            dispatch(statusActions.setSuccess(false));
            dispatch(statusActions.setMessage("Failed to create new invoice"));
        }
        dispatch(statusActions.setLoading());
    }
}

const deleteInvoice = id => {
    return async (dispatch) => {
        dispatch(statusActions.setLoading());
        try {
            await apiService.call('delete', `invoice/${id}`);
            dispatch(removeInvoice(id));
            dispatch(statusActions.setSuccess(true));
            dispatch(statusActions.setMessage("Invoice deleted successfully"));
        } catch (err) {
            dispatch(statusActions.setSuccess(false));
            dispatch(statusActions.setMessage("Failed to delete the invoice"));
        }
        dispatch(statusActions.setLoading());
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