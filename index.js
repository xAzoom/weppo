import express from 'express';
import {twig} from 'twig';
import session from 'express-session';
const cookieParser = require('cookie-parser');
import sequelize from 'sequelize';

import {
    home,
    product,
    customer,
    cart,
} from './controllers/index';

import Auth from './auth/index';


const app = express();

app.use(cookieParser());

app.set('twig options', {
    allow_async: true,
    strict_variables: false
});

app.set('view engine', 'twig');
app.set('views', './views');
app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(express.urlencoded({extended: true}));

app.get('/', home);

app.get('/product/:productName', product.getProduct);
app.use('/product', product.createProduct);
app.get('/search/products/:query', product.searchProducts);
app.get('/products/:offset/:limit', product.getAllProducts);

app.use('/register', customer.register);
app.use('/login', customer.login);
app.use('/logout', customer.logout);

app.use('/cart', Auth.customer, cart.showCart);

app.listen(9000,() => {
    console.log(`app is listening to port 9000`);
});