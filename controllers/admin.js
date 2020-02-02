import bcrypt from 'bcryptjs';

import {Admin, Customer} from "../models";
import Roles from "../auth/ROLES";

let admin = {};

admin.showUsers = (req, res) => {
    Customer
        .findAll()
        .then(customers => {
            res.render('admin/users', {role: req.session.role, users: customers})
        })
        .catch(error => res.render('500', {role: req.session.role}));

};

admin.login = (req, res) => {
    if (req.body.nickname != null) {
        const {password, nickname} = req.body;

        Admin
            .findOne({
                where: {
                    nickname: nickname,
                }
            })
            .then(admin => {
                if (bcrypt.compareSync(password, admin.password)) {
                    req.session.nickname = admin.nickname;
                    req.session.role = Roles.Admin;
                    res.redirect("/");
                } else {
                    res.render('admin_login', {role: req.session.role});
                }
            })
            .catch(error => res.render('admin_login', {role: req.session.role}));
    } else {
        res.render('admin_login');
    }
};

module.exports = admin;