const {db} = require('../connection');
const invoice = require('../models/invoice-model');
const invoiceModel = invoice(db);
const { STATUS_CODES, APIError } = require('../../utils/app-error');

module.exports = {

    async findInvoices() {
        try {
            const invoices = await invoiceModel.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ]
            });

            return invoices;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to retrieve invoices');
        }
    },

    async createInvoice(data) {
        console.log(data);
        const {date, customer_name, sale_person, notes, products} = data;
        try {
            const invoice = await invoiceModel.create({
                date: date,
                customer_name: customer_name,
                sale_person: sale_person,
                notes: notes,
                products: JSON.stringify(products),
            });
            

            return invoice;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to create invoice');
        }
    },

    async findByPk(id) {
        try {
            const invoice = await invoiceModel.findByPk(id);
            return invoice;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, `Unable to get specific invoice with id: ${id}`);
        }
    },

    async deleteByPk(id) {
        try {
            const count = await invoiceModel.destroy({ where: {id: id}});
            return (count > 0)? true: false;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, "Unable to delete invoice");
        }
    }
}