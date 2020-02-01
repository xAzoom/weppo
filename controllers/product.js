import {Op} from 'sequelize';

import {Product} from '../models/index';

let product = {};

product.getProduct = (req, res) => {
    Product.findOne({
        where: {
            name: req.params['productName']
        }
    }).then(response => {
        res.status(200).send(response.dataValues);
    }).catch(response => {
        res.status(404).send({});
    });
};

product.getAllProducts = (req, res) => {
    const {offset, limit} = req.params;
    if(isNaN(parseInt(offset)) || isNaN(parseInt(limit))) {
        return {};
    }
    Product.findAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [
            ['id', 'DESC']
        ]
    }).then(response => {
        res.status(200).send(response);
    }).catch(response => {
        res.status(404).send({});
    });
};

product.searchProducts = (req, res) => {
    Product.findAll({
        where: {
            name: {
                [Op.like]:  '%' + req.params['query'] + '%'
            }
        }
    }).then(response => {
        console.log(response);
        res.status(200).send(response);
    }).catch(response => {
        console.log(response);
        res.status(404).send({});
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
        res.render('create_product');
    }
};

module.exports = product;