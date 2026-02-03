import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [buyNowItem, setBuyNowItem] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('axion-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setIsInitialized(true);
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('axion-cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    // Save buyNowItem to local storage whenever it changes
    useEffect(() => {
        if (buyNowItem) {
            localStorage.setItem('axion-buy-now', JSON.stringify(buyNowItem));
        } else {
            localStorage.removeItem('axion-buy-now');
        }
    }, [buyNowItem]);

    // Load buyNowItem on mount
    useEffect(() => {
        const savedBuyNow = localStorage.getItem('axion-buy-now');
        if (savedBuyNow) {
            setBuyNowItem(JSON.parse(savedBuyNow));
        }
    }, []);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[₹,]/g, ''));
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const clearCart = () => setCart([]);
    const clearBuyNow = () => setBuyNowItem(null);

    const buyNow = (product) => {
        setBuyNowItem({ ...product, quantity: 1 });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
            getCartCount,
            getCartCount,
            clearCart,
            buyNowItem,
            buyNow,
            clearBuyNow
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
