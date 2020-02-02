import {Op} from 'sequelize';

import {Product} from '../models/index';
import Roles from "../auth/ROLES";
import {Customer} from "../models";

let product = {};

product.getProduct = (req, res) => {
    Product.findOne({
        where: {
            name: req.params['productName']
        }
    }).then(response => {
        res.render('product', {product: response.dataValues, role: req.session.role});
    }).catch(response => {
        res.status(404).send({});
    });
};

product.getAllProducts = (req, res) => {
    const {offset, limit} = req.params;
    if (isNaN(parseInt(offset)) || isNaN(parseInt(limit))) {
        return {};
    }
    Product.findAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [
            ['id', 'DESC']
        ]
    }).then(response => {
        res.status(200).render('products', {products: response, role: req.session.role})
    }).catch(response => {
        res.status(404).send({});
    });
};

product.searchProducts = (req, res) => {
    Product.findAll({
        where: {
            name: {
                [Op.like]: '%' + req.query['query'] + '%'
            }
        }
    }).then(response => {
        res.render('search', {products: response, role: req.session.role})
    }).catch(response => {
        res.render('404', {role: req.session.role})
    });
};

product.createProduct = (req, res) => {
    if (req.body.name != null) {
        const {name, description, imageSrc, price} = req.body;
        return Product
            .create({
                name: name,
                description: description,
                image_src: imageSrc,
                price: price,
            })
            .then(product => res.status(201).send(product))
            .catch(error => res.status(400).send(error));
    } else {
        res.render('admin/create_product', {session: req.session, role: req.session.role});
    }
};

product.updateProduct = (req, res) => {
    const {name, image_src, description, price, id} = req.body;
    Product
        .findOne({
            where: {
                id: id
            }
        })
        .then(product => {
            product.name = name;
            product.image_src = image_src;
            product.description = description;
            product.price = price;
            product.save()
                .then(() => {
                    res.redirect('/products/0/100')
                })
                .catch(error => res.render('500', {role: req.session.role}));
        })
        .catch(error => res.render('500', {role: req.session.role}));
};

product.deleteProduct = (req, res) => {
    Product
        .findOne({
            where: {
                id: req.params['id']
            }
        })
        .then(product => {
            product.destroy()
                .then(() => {
                    res.redirect('/products/0/100')
                })
                .catch(error => res.render('500', {role: req.session.role}));

        })
        .catch(error => res.render('500', {role: req.session.role}));
};

module.exports = product;