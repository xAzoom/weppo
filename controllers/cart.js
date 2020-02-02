import {Op} from 'sequelize';

import {Product} from '../models';

let cart = {};

cart.addToCart = (req, res) => {
    const {name} = req.params;
    if (name) {
        const cart = req.session.cart;
        if (!req.session.cart[name]) {
            cart[name] = 1;
        } else {
            cart[name]++;
        }
        req.session.cart = cart;
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }

};

cart.showCart = (req, res) => {
    const productNames = [];
    for(const name in req.session.cart) {
        productNames.push({'name': name})
    }
    Product.findAll({
        where: {
            [Op.or]: productNames
        }
    }).then((response) => {
        let cart = [];
        let price = 0;
        for(const element of response) {
            const product = element.dataValues;
            price += req.session.cart[product['name']] * product['price'];
            cart.push({
                'name': product['name'],
                'unitPrice': product['price'],
                'amount': req.session.cart[product['name']],
                'price': req.session.cart[product['name']] * product['price'],
            })
        }
        res.render('customer/cart', {cart, price, role: req.session.role});
    }).catch((error) => {
        res.status(400).send(error);
    })
};

module.exports = cart;