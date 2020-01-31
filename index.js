import express from 'express';
import {twig} from 'twig';

import {home, product} from './controllers/index.js';


const app = express();

app.set("twig options", {
    allow_async: true,
    strict_variables: false
});

app.set('view engine', 'twig');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));

app.get('/', home);
app.get('/product/:productId', product.getProduct);
app.post('/product', product.createProduct);
app.get('/product', product.createProduct);
app.get('/products', product.getAllProducts);

const greet = `app is listening to port 9000`;

app.listen(9000,() => {
    console.log(greet);
});