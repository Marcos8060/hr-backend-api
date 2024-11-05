const route = require('express').Router();

const authorizeRole = require('../middleware/role-based-access')
const protectedRoute = require('../middleware/protected-routes')
const { getAllProducts, addProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product-controller')


route.get('/getProducts', getAllProducts)
route.post('/addProduct', protectedRoute, authorizeRole('user'), addProduct)
route.put('/updateProduct/:id', protectedRoute, authorizeRole('user'), updateProduct)
route.delete('/deleteProduct/:id', protectedRoute, authorizeRole('user'), deleteProduct)
route.get('/productDetail/:id', getSingleProduct)

module.exports = route