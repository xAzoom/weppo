import bcrypt from 'bcryptjs';

import {Customer} from "../models";
import Roles from '../roles';


let customer = {};

customer.register = (req, res) => {
    if (req.body.firstname != null) {
        const {firstname, lastname, password, email} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        return Customer
            .create({
                firstname: firstname,
                lastname: lastname,
                password: hash,
                email,
            })
            .then(customer => res.status(201).send(customer))
            .catch(error => res.status(400).send(error));
    } else {
        res.render('register');
    }
};

customer.login =  (req, res) => {
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
                    req.session.email = customer.email;
                    req.session.role = Roles.Customer;
                    res.status(200).send(req.session);
                } else {
                    res.status(400).send({'status': '400'})
                }
            })
            .catch(error => res.status(400).send(error));
    } else {
        res.render('login');
    }
};

customer.logout = (req, res) => {
    if (req.session.role === Roles.Customer) {
        req.session.destroy();
    }
    res.redirect('/login');
};

module.exports = customer;