import {Order} from "../models";


let order = {};

order.creatOrder = (req, res) => {
    if (req.body.userId != null) {
        const {userId, price, items} = req.body;
        Order
            .create({
                customerId: userId,
                items: items,
                value: price,
            })
            .then(product => {
                req.session.cart = {};
                res.redirect('/cart');
            })
            .catch(error => {
                res.render('500', {role: req.session.role});
            });
    } else {
        res.render('400', {role: req.session.role});
    }
};

order.getAll = (req, res) => {
    Order.findAll()
        .then(orders => {
            const newOrders = orders.map(order => {
                return {
                    customerId: order.customerId,
                    items: JSON.parse(order.items),
                    value: order.value
                }
            });
            console.log(newOrders);
            res.render('admin/orders', {role: req.session.role, orders: newOrders})
        })
        .catch(error => {
            res.render('500', {role: req.session.role})
        })
}

module.exports = order;