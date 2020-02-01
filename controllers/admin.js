import bcrypt from 'bcryptjs';

import {Admin, Customer} from "../models";
import Roles from "../auth/ROLES";

let admin = {};

admin.showUsers = (req, res) => {
    res.send("OK");
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
                    res.status(200).send(req.session);
                } else {
                    res.render('admin_login');
                }
            })
            .catch(error => res.render('admin_login'));
    } else {
        res.render('admin_login');
    }
};

module.exports = admin;