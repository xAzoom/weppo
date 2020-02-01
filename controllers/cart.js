import Auth from '../auth/customer';

let cart = {};

cart.showCart = (req, res) => {
    res.send("OK");
};

module.exports = cart;