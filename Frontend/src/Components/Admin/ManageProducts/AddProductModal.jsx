import React, { useState } from 'react';
import { addProduct } from '../../../Utils/productApi.js';
import { Puff } from 'react-loader-spinner';

function AddProductModal({ onClose, refreshProducts }) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [inventory, setInventory] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  // New state to track the loader
    const [success, setSuccess] = useState(false);  // Track success for modal closure

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Show loader while waiting for the response
        setMessage('');

        // Create FormData object to handle file upload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('rating', rating);
        formData.append('inventory', inventory);
        formData.append('image', image);

        try {
            const response = await addProduct(formData);
            if (response && response.status === 201) {
                setMessage('Product added successfully!');
                setSuccess(true); 
                refreshProducts();  
                setTimeout(() => {
                    setLoading(false);
                    onClose();
                }, 1000);
            } else {
                setMessage('There was a problem adding the product. Please try again.');
                setSuccess(false);  
            }
        } catch (err) {
            setMessage('There was a problem adding the product. Please try again.');
            setSuccess(false);
            console.error('Failed to add product', err);
        } finally {
            setLoading(false);  // Stop the loader once response is received
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 h-3/5 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>

                {loading ? (
                    // Loader component when API request is in progress
                    <div className="flex justify-center items-center h-32">
                        <Puff
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="puff-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                ) : (
                    // Form shown when not loading
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Brand</label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Rating</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Inventory</label>
                            <input
                                type="number"
                                value={inventory}
                                onChange={(e) => setInventory(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full border rounded px-3 py-2"
                                accept="image/*"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="mr-3 px-4 py-2 bg-gray-400 text-white rounded"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-500 text-white rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
                {message && (
                    <p className={`mt-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default AddProductModal;
