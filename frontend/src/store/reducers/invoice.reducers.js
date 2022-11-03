import { invoiceConstants } from "../constants";

const initialState = {
    invoiceList: [],
    invoice: {},
}

export function invoicing(state = initialState, action) {
    switch (action.type) {
        case invoiceConstants.GET_INVOICES:
            return {
                ...state,
                invoiceList: action.invoices
            };
        case invoiceConstants.GET_INVOICE:
            return {
                ...state,
                invoice: action.invoice
            };
        case invoiceConstants.CREATE_INVOICE:
            return {
                ...state,
                invoiceList: [action.invoice, ...state.invoiceList]
            };
        case invoiceConstants.DELETE_INVOICE:
            const filteredInvoices = state.invoiceList.filter(inv => inv.id!=action.id);
            return {
                ...state,
                invoiceList: filteredInvoices
            };
        default:
            return state;
    }
}