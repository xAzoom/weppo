import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import {
    home,
    product,
    customer,
    admin,
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
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));


app.get('/', home);

app.get('/product/:productName', product.getProduct);
app.use('/product/update', Auth.admin, product.updateProduct);
app.use('/product/delete/:id', Auth.admin, product.deleteProduct);
app.use('/product', Auth.admin, product.createProduct);
app.get('/search', product.searchProducts);
app.get('/products/:offset/:limit', product.getAllProducts);

app.use('/register', customer.register);
app.use('/login', customer.login);
app.use('/logout', customer.logout);

app.get('/cart', Auth.customer, cart.showCart);
app.get('/cart/add/:name', Auth.customer, cart.addToCart);

app.get('/users', Auth.admin, admin.showUsers);
app.use('/nieadmin/login', admin.login);


app.listen(9000,() => {
    console.log(`app is listening to port 9000`);
});