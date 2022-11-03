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
            const invoices = data.map(inv => ({...inv, key: inv.id}));
            dispatch(setInvoices(invoices));
        } catch (err) {
            dispatch(setInvoices([]));
        }
    }
};

export const invoiceActions = {
    setInvoices,
    setInvoice,
    addInvoice,
    removeInvoice,
    getInvoices
}