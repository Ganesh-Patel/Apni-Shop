import React, { useEffect, useState } from 'react';
import { getAllProducts, addProduct } from '../../../Utils/productApi.js';

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    // Fetch products from API
    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await getAllProducts();
            setProducts(response.products); 
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleAddProduct = () => {
        setModalOpen(true); // Open modal on button click
    };

    const handleModalClose = () => {
        setModalOpen(false); // Close modal
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto mt-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">Manage Products</h1>
            <div className="mt-5">
                <button
                    className="bg-teal-500 text-white px-5 py-2 rounded"
                    onClick={handleAddProduct}
                >
                    Add Product
                </button>
            </div>

            {isModalOpen && <AddProductModal onClose={handleModalClose} refreshProducts={getProducts} />}

            <table className="min-w-full bg-white border-collapse border border-gray-300 mt-5">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-4">Image</th>
                        <th className="border p-4">Name</th>
                        <th className="border p-4">Brand</th>
                        <th className="border p-4">Category</th>
                        <th className="border p-4">Price</th>
                        <th className="border p-4">Stock</th>
                        <th className="border p-4">Rating</th>
                        <th className="border p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-t">
                            <td className="border p-4">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="h-16 w-16 object-cover"
                                />
                            </td>
                            <td className="border p-4">{product.name}</td>
                            <td className="border p-4">{product.brand}</td>
                            <td className="border p-4">{product.category}</td>
                            <td className="border p-4">${product.price}</td>
                            <td className="border p-4">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                            <td className="border p-4">{product.rating}</td>
                            <td className="border p-4 space-x-2">
                                {/* Add edit and delete actions here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProducts;
