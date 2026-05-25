import products from '../products_list';
import { API_BASE_URL } from '../config/apiConfig';

export const getProducts = () => {
    if (API_BASE_URL) {
        // Ovde se kasnije povezuje GET /api/products.
    }

    return products;
};

export const getProductById = (productId) => {
    if (API_BASE_URL) {
        // Ovde se kasnije povezuje GET /api/products/:id.
    }

    return products.find((item) => item._id === productId);
};
