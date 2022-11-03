const invoiceRepository = require("../database/repository/invoice-repository");
const { APIError } = require("../utils/app-error");

module.exports = {

    async getAllInvoices() {
        try {
            const invoices = await invoiceRepository.findInvoices();
            return {data: invoices};
        } catch (err) {
            throw new APIError('Unable to get invoices');
        }
    },

    async createInvoice(invoiceData) {
        try {
            const invoice = await invoiceRepository.createInvoice(invoiceData);
            return {data: invoice};
        } catch (err) {
            throw new APIError('Unable to create invoice');
        }
    },

    async getInvoice(id) {
        try {
            const invoice = await invoiceRepository.findByPk(id);
            return {data: invoice};
        } catch (err) {
            throw new APIError(`Unable to get specific invoice with id: ${id}`);
        }
    },
    
    async deleteInvoice(id) {
        try {
            const isDeleted = await invoiceRepository.deleteByPk(id);
            return {success: isDeleted};
        } catch (err) {
            throw new APIError('Unable to delete invoice');
        }
    }

}