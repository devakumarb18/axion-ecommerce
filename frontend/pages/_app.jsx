import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <CartProvider>
                <Component {...pageProps} />
            </CartProvider>
        </AuthProvider>
    );
}
