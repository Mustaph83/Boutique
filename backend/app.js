const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./product');
const app = express();

mongoose.connect('mongodb+srv://taph:taph15@cluster0-7euk1.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
    const product = new Product({
        ...req.body
    })
    product.save()
        .then((product) => res.status(200).json({ product }))
        .catch(error => res.status(404).json({ error }));
});

app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(() => res.status(200).json({ Product }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/products:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => res.status(200).json({ product }))
        .catch(error => res.status(404).json({ error }));
});

app.put('/api/prducts', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Delete!' }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;