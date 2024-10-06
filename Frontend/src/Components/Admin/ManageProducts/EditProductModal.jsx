import React, { useState, useRef } from 'react';

function EditProductModal({ product, onClose, refreshProducts, editProduct }) {
  const [selectedId, setSelectedId] = useState(product?._id || '');
  const [name, setName] = useState(product?.name || '');
  const [brand, setBrand] = useState(product?.brand || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price || '');
  const [inStock, setInStock] = useState(product?.inStock || false);
  const [rating, setRating] = useState(product?.rating || 0);
  const [description, setDescription] = useState(product?.description || '');
  const [inventory, setInventory] = useState(product?.inventory || '');
  const [image, setImage] = useState(product?.images || []);
  const [profilePic, setProfilePic] = useState(image[0]);
  const [imagesForDb, setImagesForDb] = useState(null);

  const fileInputRef = useRef(null);  // Use useRef to directly reference the file input

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagesForDb(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('inStock', inStock);
    formData.append('rating', rating);
    formData.append('description', description);
    formData.append('inventory', inventory);

    if (imagesForDb) {
      formData.append('image', imagesForDb);  
    } 
    try {
      const response = await editProduct(selectedId, formData);
      console.log(response);
      refreshProducts();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 h-3/5 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form encType="multipart/form-data" onSubmit={handleUpdateProduct}>
          {/* Image Upload */}
          <div className="flex flex-col items-center mb-4">
            <div
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 cursor-pointer relative"
              onClick={() => document.getElementById('productImage').click()}
            >
              {profilePic ? (
                <img src={profilePic} alt="Product" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">Browse</span>
              )}
            </div>
            <input
              id="productImage"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Other input fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="brand"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="category"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price (Rs.)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <select
              value={inStock}
              onChange={(e) => setInStock(e.target.value === 'true')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="inStock"
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Inventory</label>
            <input
              value={inventory}
              onChange={(e) => setinventory(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="inventory"
            />         
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="rating"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
