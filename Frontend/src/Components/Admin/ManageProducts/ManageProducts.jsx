import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, editProduct } from '../../../Utils/productApi.js'; // Import API functions
import AddProductModal from './AddProductModal.jsx';
import ConfirmationBox from '../../SubComponents/ConfirmationBox';
import EditProductModal from './EditProductModal.jsx';
import { Puff } from 'react-loader-spinner';

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [isConfirmOpen, setConfirmOpen] = useState(false);  // For confirmation modal
    const [actionMessage, setActionMessage] = useState('');
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeRowId, setActiveRowId] = useState(null);

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
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false); // Close modal
    };

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);   
        if (term) {
            const searchResults = await getAllProducts({ name: term });
            setProducts(searchResults.products); 
        } else {
            getProducts();
        }
    };

    const handleAction = (action, id) => {
        setSelectedProductId(id);
        setSelectedAction(action);
    
        if (action === 'delete') {
          setActionMessage('Are you sure you want to delete this product?');
          setConfirmOpen(true); 
        } else if (action === 'edit') {
          setActionMessage('Are you sure you want to edit this product?');
          setConfirmOpen(true); 
        } else if (action === 'out_of_stock') {
          setActionMessage('Are you sure you want to mark this product as out of stock?');
          setConfirmOpen(true); // Open confirmation modal
        }
    };
    
    // Handle Confirm button click
    const handleConfirm = async () => {
        const product = products.find((p) => p._id === selectedProductId);
        setSelectedProduct(product);
        if (selectedAction === 'delete') {
          try {
            await deleteProduct(selectedProductId); // Await the delete function
            getProducts(); // Refresh products
          } catch (err) {
            console.error('Failed to delete product:', err);
          }
        } else if (selectedAction === 'edit') {
          setEditModalOpen(true);
          console.log('Editing product:', selectedProductId);
        } else if (selectedAction === 'out_of_stock') {
          try {
            await markProductOutOfStock(selectedProductId); // Call API to mark out of stock
            getProducts(); // Refresh products list
          } catch (err) {
            console.error('Failed to mark product out of stock:', err);
          }
        }
        setConfirmOpen(false); // Close confirmation modal after action
    };

    // Handle Cancel button click
    const handleCancel = () => {
        setConfirmOpen(false); 
        setEditModalOpen(false);
    };
    const handleRowClick = (id) => {
        // if(activeRowId)
        // {
        //     setActiveRowId(null);
        // }else{
        //     setActiveRowId(id);
        // }
        setActiveRowId(id);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Puff
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                />
            </div>
        );
    }
    
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto mt-16">
            <h1 className="text-3xl text-center font-bold text-gray-800">Manage Products</h1>
            <div className="mt-5">
                <button
                    className="bg-teal-500 text-white px-5 py-2 rounded"
                    onClick={handleAddProduct}
                >
                    Add Product
                </button>
            </div>

            {isModalOpen && <AddProductModal onClose={handleModalClose} refreshProducts={getProducts}  />}
            <input
                type="text"
                placeholder="Search by product name or ID"
                value={searchTerm}
                onChange={handleSearch}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />


            <div className="overflow-x-auto"> {/* This will allow horizontal scrolling */}
                <table className="min-w-full bg-white border-collapse border border-gray-300 mt-5 mb-4">
                    <thead>
                        <tr className="bg-gray-200 ">
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
                    <tbody className='text-center'>
                        {products.map((product) => (
                            <tr key={product._id}  className={`border-t hover:bg-gray-100 cursor-pointer ${activeRowId === product._id ? 'bg-gray-200' : ''}`}
                            onClick={() => handleRowClick(product._id)}
                            >
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
                                <td className="border p-4">Rs.{product.price}</td>
                                <td className="border p-4">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                                <td className="border p-4">{product.rating}</td>
                                <td className="border p-4 space-x-2">
                                    <select
                                        className="border rounded px-2 py-1"
                                        onChange={(e) => handleAction(e.target.value, product._id)}
                                    >
                                        <option value="" disabled selected>
                                            Actions
                                        </option>
                                        <option value="edit">Edit</option>
                                        <option value="delete">Delete</option>
                                        <option value="out_of_stock">Mark Out of Stock</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Reusable Confirmation Box */}
            <ConfirmationBox
                isOpen={isConfirmOpen}
                message={actionMessage}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            {isEditModalOpen && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={handleCancel}
                    refreshProducts={getProducts}
                    deleteProduct={deleteProduct}
                    editProduct={editProduct}
                />
            )}
        </div>
    );
}

export default ManageProducts;
