const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: {
                    items: [],
                    totalPrice: 0
                }
            });
        }

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get cart',
            error: error.message
        });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Validate product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: []
            });
        }

        // Check if product already in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add item to cart',
            error: error.message
        });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        // Check stock
        const product = await Product.findById(item.product);
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        item.quantity = quantity;
        await cart.save();
        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Cart updated',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update cart',
            error: error.message
        });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items.pull(itemId);
        await cart.save();
        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart',
            error: error.message
        });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart cleared',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to clear cart',
            error: error.message
        });
    }
};
