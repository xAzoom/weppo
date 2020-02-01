import express from 'express';
import {twig} from 'twig';
import session from'express-session';

import {home, product} from './controllers/index.js';


const app = express();

app.set('twig options', {
    allow_async: true,
    strict_variables: false
});

app.set('view engine', 'twig');
app.set('views', './views');
app.use(session({
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(express.urlencoded({extended: true}));

app.get('/', home);
app.get('/product/:productName', product.getProduct);
app.post('/product', product.createProduct);
app.get('/product', product.createProduct);
app.get('/search/products/:query', product.searchProducts);
app.get('/products/:offset/:limit', product.getAllProducts);

app.listen(9000,() => {
    console.log(`app is listening to port 9000`);
});