import React, { useState } from 'react';
import { addProduct } from '../../../Utils/productApi.js';

function AddProductModal({ onClose, refreshProducts }) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create FormData object to handle file upload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('image', image); 
        try {
            await addProduct(formData); 
            refreshProducts(); 
            onClose(); 
        } catch (err) {
            console.error('Failed to add product', err);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit}>
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
            </div>
        </div>
    );
}

export default AddProductModal;
