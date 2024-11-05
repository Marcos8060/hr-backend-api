const Product = require('../models/product-model')


const getAllProducts = async(req,res) => {
    try {
        const products = await Product.findAll()
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const addProduct = async(req,res) => {
    try {
        await Product.create({
            ...req.body,
            createdBy: req.user.username,
        })
        return res.status(201).json({ message: 'Product created successfully'});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateProduct = async(req,res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.update(req.body, { where: { id: id }})
        if(!updatedProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(201).json({ message: 'Product updated successfully'});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async(req,res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.destroy({ where: { id: id }})
        if(!deletedProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully'});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getSingleProduct = async(req,res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct
}