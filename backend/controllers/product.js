const product = require('../models/product');

exports.addProduct = (req, res, next) => {
    const product = new Product({
        ...req.body
    })
    product.save()
        .then((product) => res.status(200).json({ product }))
        .catch(error => res.status(404).json({ error }));
};

exports.findProduct = (req, res, next) => {
    Product.find()
        .then(() => res.status(200).json({ Product }))
        .catch(error => res.status(400).json({ error }));
};

exports.findOneProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => res.status(200).json({ product }))
        .catch(error => res.status(404).json({ error }));
};

exports.updateProduct = (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Delete!' }))
        .catch(error => res.status(400).json({ error }));
}

