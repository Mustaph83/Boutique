const express = require('express');
const productCtr = require('../controllers/product')
const router = express.Router();

router.get('/', productCtr.findProduct);

router.get('/:id',productCtr.findOneProduct);

router.put('/ :id', productCtr.updateProduct);

router.delete('/:id', productCtr.deleteProduct);

router.post('/', productCtr.addProduct);

module.exports = router;