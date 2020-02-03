import bcrypt from 'bcryptjs';

import {Customer} from "../models";
import Roles from '../auth/ROLES';


let customer = {};

customer.register = (req, res) => {
    if (req.session.role === Roles.Customer || req.session.role === Roles.Admin) {
        res.redirect('/');
        res.end();
        return;
    }
    if (req.body.firstname != null) {
        const {firstname, lastname, password, email} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        return Customer
            .create({
                firstname: firstname,
                lastname: lastname,
                password: hash,
                email: email,
            })
            .then(customer => {
                req.session.userId = customer.id;
                req.session.role = Roles.Customer;
                req.session.cart = {};
                res.redirect('/');
            })
            .catch(error => res.status(400).send(error));
    } else {
        res.render('register', {role: req.session.role});
    }
};

customer.login =  (req, res) => {
    if (req.session.role === Roles.Customer || req.session.role === Roles.Admin) {
        res.redirect('/');
        res.end();
        return;
    }
    if (req.body.email != null) {
        const {password, email} = req.body;

        Customer
            .findOne({
                where: {
                    email: email,
                }
            })
            .then(customer => {
                if (bcrypt.compareSync(password, customer.password)) {
                    req.session.userId = customer.id;
                    req.session.role = Roles.Customer;
                    req.session.cart = {};
                    res.redirect('/');
                } else {
                    res.render('login', {role: req.session.role})
                }
            })
            .catch(error => res.render('login', {role: req.session.role}));
    } else {
        res.render('login', {role: req.session.role});
    }
};

customer.logout = (req, res) => {
    if (req.session.role === Roles.Customer || req.session.role === Roles.Admin) {
        req.session.destroy();
    }
    res.redirect('/login');
};

module.exports = customer;