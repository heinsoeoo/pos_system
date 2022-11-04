# POS Invoicing System

## Description

This is a POS system with invoicing feature. The products can be added to cart by clicking on them and create invoice for selling products.


### Installing Guide

#### Server Installation

```
cd server
npm install
npm run dev/npm start
```

#### Web Application Installation

```
cd frontend
npm install
npm start
```

### API Endpoints

| Methods    | Endpoints         | Description                     |
| ---------- | ----------------- | -----------------------------   |
| POST       | /register         | Register new account.           |
| POST       | /login            | Account authentication          |
| GET        | /me               | Get auth user's info            |
| GET        | /invoices         | Retrieve all invoices           |
| POST       | /invoice          | Create new invoice.             |
| GET        | /invoice/:id      | Retrieve a specific invoice     |
| Delete     | /invoice/:id      | Delete a specific invoice       |

- [Server Api](https://pos4invoice.herokuapp.com) Deployed on Heroku
