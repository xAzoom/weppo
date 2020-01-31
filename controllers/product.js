import {Product} from '../models/index';

const getProduct = (req, res) => {
    Product.findOne({
        where: {
            id: req.params['productId']
        }
    }).then(response => {
        res.status(200).send(response.dataValues);
    }).catch(response => {
        res.status(404).send("RESOURCE NOT FOUND");
    });
};

const getAllProducts = (req, res) => {
    Product.findAll().then(response => {
        res.status(200).send(response);
    }).catch(response => {
        res.status(404).send("RESOURCE NOT FOUND");
    });
};

const createProduct = (req, res) => {
    if(req.body.name != null) {
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

const product = {
    getProduct,
    getAllProducts,
    createProduct,
};

module.exports = product;