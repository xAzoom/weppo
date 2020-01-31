import express from 'express';
import Twig from 'twig';

import homeRoute from "./routes/home";

const twig = Twig.twig;

const app = express();

app.set("twig options", {
    allow_async: true,
    strict_variables: false
});

app.set('view engine', 'twig');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));

app.get('/', homeRoute);

app.listen(9000,() => {
    console.log(`app is listening to port 9000`);
});