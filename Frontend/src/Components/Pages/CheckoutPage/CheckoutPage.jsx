import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Contexts/CartContext.jsx';
import {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} from '../../../Utils/addressApi.js'; // Import the API methods
import AddressModal from '../DeliveryAddress/AddressModal.jsx';
import { UserContext } from '../../../Contexts/UserContext.jsx';

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(cart?.cart?.totalPrice || 0);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null); // To handle address update
  const [coupon, setCoupon] = useState('');
  const [couponValid, setCouponValid] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const{user}=useContext(UserContext);
  

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userId = user._id; // Replace with actual user ID
        const addresses = await getAllAddresses(userId);
        setSavedAddresses(addresses);
        if (addresses.length > 0) {
          setSelectedAddress(addresses[0]._id); // Set the first address as selected by default
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchAddresses(); // Fetch addresses on component mount
  }, []);

  const handleCouponApply = () => {
    if (coupon === 'SAVE10') {
      setCouponValid(true);
      setTotalPrice(prevTotal => prevTotal * 0.9);
    } else {
      setCouponValid(false);
    }
  };

  const handlePayment = () => {
    setTimeout(() => {
      setIsPaymentDone(true);
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    }, 1000);
  };

  const handleAddressModalOpen = (address = null) => {
    setIsAddressModalOpen(true);
    if (address) {
      setCurrentAddress(address);
      setIsEditMode(true);
    } else {
      setCurrentAddress(null);
      setIsEditMode(false);
    }
  };

  const handleAddressModalClose = () => {
    setIsAddressModalOpen(false);
    setCurrentAddress(null);
  };

  const handleAddressSubmit = async (newAddress) => {
    try {
      if (isEditMode && currentAddress) {
        // Update existing address
        await updateAddress(currentAddress._id, newAddress);
        setSavedAddresses(savedAddresses.map(addr => (addr._id === currentAddress._id ? newAddress : addr)));
      } else {
        // Create new address
        const savedAddress = await createAddress(newAddress);
        setSavedAddresses([...savedAddresses, savedAddress]);
      }
      setSelectedAddress(newAddress._id);
      setIsAddressModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div className="mt-12 container mx-auto p-4">
      <h1 className="text-teal-500 font-bold text-center text-3xl mb-6">Checkout</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart?.cart?.products?.map((item) => (
          <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
            <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-500">₹{item.product.description}</p>
              <p className="text-gray-500">Quantity: {item.count}</p>
              <p>Price: ₹{item.product.price}</p>
              <p>Total: ₹{(item.product.price * item.count).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Address */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Select Delivery Address</h2>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
        >
          {savedAddresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {addr.firstName} - {addr.street}, {addr.city}, {addr.state} {addr.zipCode}, {addr.country}
            </option>
          ))}
        </select>

        <div className="mt-4 flex justify-between">
          <button
            className="text-teal-500 underline"
            onClick={() => handleAddressModalOpen()}
          >
            Add New Address
          </button>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Apply Coupon</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={handleCouponApply}
            className="bg-teal-500 text-white px-4 py-2 rounded-md"
          >
            Apply Coupon
          </button>
        </div>
        {couponValid === true && <p className="text-green-500 mt-2">Coupon Applied Successfully!</p>}
        {couponValid === false && <p className="text-red-500 mt-2">Invalid Coupon Code</p>}
      </div>

      {/* Total Price */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</h2>
      </div>

      {/* Payment */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePayment}
          disabled={isPaymentDone}
          className="bg-teal-500 text-white px-6 py-3 rounded-md"
        >
          Pay Now
        </button>
        <button
          onClick={() => navigate('/cart')}
          className="text-teal-500 underline"
        >
          Back to Cart
        </button>
      </div>

      {/* Payment Success */}
      {isPaymentDone && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-green-500">Order Placed Successfully!</h2>
        </div>
      )}

      {/* Address Modal */}
      <AddressModal 
        show={isAddressModalOpen} 
        handleClose={handleAddressModalClose} 
        handleSave={handleAddressSubmit}
        address={currentAddress} // Pass the current address for editing
      />
    </div>
  );
}

export default Checkout;
