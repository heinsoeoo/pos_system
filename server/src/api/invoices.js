const invoiceController = require('../controllers/invoice-controller');
const apiAuth = require('./middleware');
const validator = require('json-request-validator');
const invoiceRule = {
    date: 'required',
    customer_name: 'required',
    sale_person: 'required',
    products: 'required'
}

module.exports = (app) => {

    app.get('/invoices', apiAuth, async(req, res, next) => {
        try {
            const data = await invoiceController.getAllInvoices();
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }   
    });

    app.post('/invoice', validator(invoiceRule), apiAuth, async(req, res, next) => {
        try {
            const {date, customer_name, sale_person, notes, products} = req.body;
            const data = await invoiceController.createInvoice({date, customer_name, sale_person, notes, products});
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });

}