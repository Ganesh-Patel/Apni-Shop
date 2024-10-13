import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Contexts/CartContext.jsx';
import Razorpay from 'react-razorpay';
import {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} from '../../../Utils/addressApi.js'; // Import the API methods
import { placeOrder } from '../../../Utils/ordersApi.js';
import { valiDateCoupon } from '../../../Utils/couponsApi.js';
import AddressModal from '../DeliveryAddress/AddressModal.jsx';
import { UserContext } from '../../../Contexts/UserContext.jsx';

function Checkout() {
  const { cart, deleteCart, orders, setOrders } = useContext(CartContext);
  console.log('initial cart ', cart)
  const cartItems = cart ? cart.products : [];
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(cart.cartTotal);
  const [discountedPrice, setDisCountedPrice] = useState(cart.cartTotal);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null); // To handle address update
  const [couponCode, setCouponCode] = useState('');
  const [couponValid, setCouponValid] = useState(null);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [couponValidMessage, setCouponValidMessage] = useState('');
  const { user } = useContext(UserContext);


  useEffect(() => {
    if (cartItems.length < 1) {
      navigate('/cart');
    }
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

  const handleCouponApply = async () => {
    try {
      const totalPriceBeforeDiscount = totalPrice;
      const response = await valiDateCoupon(couponCode, totalPrice);

      if (response.status === 200) {
        setCouponValid(true);
        const { discount, isPercentage, message } = response.data;

        // Set the success message from the backend
        setCouponValidMessage('Coupon applied successfully!');

        // Apply the discount based on its type
        const newTotalPrice = isPercentage
          ? totalPriceBeforeDiscount * (1 - discount / 100)
          : totalPriceBeforeDiscount - discount;
        console.log('new Total Price after Discount', newTotalPrice)

        // Ensure the total price doesn't go below zero
        setDisCountedPrice(Math.max(newTotalPrice, 0))
        setIsCouponApplied(true);
      } else {
        setCouponValid(false);
        console.log(response.data);
        // Set the error message from the backend response
        setCouponValidMessage(response.data?.message || 'Invalid or expired coupon');
      }
    } catch (error) {
      // Handle any network or other errors
      const errorMessage = error.response?.data?.message || 'Network Error';
      setCouponValid(false);
      setCouponValidMessage(errorMessage);
      console.error('Error applying the coupon:', errorMessage);
    }
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
  const handleCouponRemove = () => {
    setCouponCode('');
    setIsCouponApplied(false);
    setCouponValidMessage('');
    setDisCountedPrice(totalPrice);
  };

  //   const handlePayment = async () => {
  //     if (!selectedAddress) {
  //       alert('Please select a delivery address.');
  //       return;
  //     }

  //     try {
  //       const orderId = `ORDER-${Date.now()}`;
  //       const orderDetails = {
  //         orderId, 
  //         userId: user._id,
  //         totalPrice: totalPrice, 
  //         discountedPrice: discountedPrice || totalPrice, 
  //         paymentMethod: isPaymentDone ? 'Paid Online' : 'Cash on Delivery',
  //         orderDate: new Date(), // Order date and time
  //         addressId: selectedAddress,
  //         products: cartItems.map((item) => ({
  //           productId: item.product._id,
  //           productName: item.product.name,
  //           quantity: item.count,
  //           price: item.product.price,
  //           discountedPrice: item.product.price, 
  //           total: item.product.price * item.count,
  //           deliveryDate: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 5) + 3)),
  //         })),
  //       };

  //       console.log('Order placed:', orderDetails);
  //       const response=await placeOrder(orderDetails);
  //       console.log(response)

  //       setOrders(orderDetails);

  //       setIsPaymentDone(true);
  //       deleteCart();

  //       setTimeout(() => {
  //         navigate('/orders');
  //       }, 2000);
  //     } catch (error) {
  //       console.error('Error placing orders:', error.message);
  //     }
  //   };
  const handlePayment = async (mode) => {
    if (!selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }

    try {
      const orderId = `ORDER-${Date.now()}`;
      const orderDetails = {
        orderId,
        userId: user._id,
        totalPrice,
        discountedPrice: totalPrice,
        paymentMethod: mode,
        orderDate: new Date(),
        addressId: selectedAddress,
        products: cartItems.map((item) => ({
          productId: item.product._id,
          productName: item.product.name,
          quantity: item.count,
          price: item.product.price,
          discountedPrice: item.product.price, // Update if there's a discount
          total: item.product.price * item.count,
          deliveryDate: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 5) + 3)),
        })),
      };

      // Set up Razorpay options
      const options = {
        key: "rzp_test_FxRK4tM1aleKRe",
        key_secret: "pxZi3HhnspLHh5kMQbqxMamd",
        amount: totalPrice * 100, // Amount in paisa (multiply by 100)
        currency: 'INR',
        name: 'Amazon', // Your store name
        description: 'Test Transaction',
        image: 'https://i.pinimg.com/736x/8a/b0/12/8ab0121c7d7a90f6415b4b0edaf035d9.jpg',
        //   order_id: orderId, // Pass the order ID for tracking purposes
        handler: async function (response) {
          setIsPaymentDone(true);
          orderDetails.paymentMethod = 'Paid Online'; // Set payment method explicitly here

          // Proceed with order placement
          const responseFromServer = await placeOrder(orderDetails);
          console.log('Server Response:', responseFromServer);

          // Update the state with the new order
          setOrders(orderDetails);
          deleteCart(); // Clear the cart
          setTimeout(() => {
            navigate('/orders');
          }, 2000);

          toast('Payment Successful!');
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || '9999999999',
        },
        notes: {
          address: 'Delivery Address',
        },
        theme: {
          color: '#F7CA01',
        },
      };

      // Create a new Razorpay instance and open the payment gateway
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      // Handle payment failure
      paymentObject.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error);
        alert('Payment failed. Please try again.');
      });

    } catch (error) {
      console.error('Error during payment or placing the order:', error.message);
      alert('An error occurred while processing your payment. Please try again.');
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

  

    const [paymentMethod, setPaymentMethod] = useState('');
  
    const handlePaymentChange = (event) => {
      setPaymentMethod(event.target.value);
    };
  
    const handleButtonClick = async() => {
      if (paymentMethod != 'cod') {
        console.log('Redirecting to payment...');
        await handlePayment("PAID");
      } else if (paymentMethod === 'cod') {
        console.log('Placing order...');
        await handlePayment("COD");
      }
    };


  return (
    <div className="mt-12 container mx-auto p-4">
      <h1 className="text-teal-500 font-bold text-center text-3xl mb-6">Checkout</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
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
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 p-2 border rounded-md"
          />
          {!isCouponApplied ? (
            <button
              onClick={handleCouponApply}
              className="bg-teal-500 text-white px-4 py-2 rounded-md"
            >
              Apply Coupon
            </button>
          ) : (
            <button
              onClick={handleCouponRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Remove Coupon
            </button>
          )}
        </div>
        {couponValid === true && <p className="text-green-500 mt-2">{couponValidMessage}</p>}
        {couponValid === false && <p className="text-red-500 mt-2">{couponValidMessage}</p>}
      </div>

      {/* Total Price */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Total Price: ₹{discountedPrice.toFixed(2)}</h2>
      </div>
      
      <div>
        <label htmlFor="payment-method">Select Payment Method:</label>
        <select id="payment-method" value={paymentMethod} onChange={handlePaymentChange}>
          <option value="">Select...</option>
          <option value="payment">Payment</option>
          <option value="cod">Cash on Delivery (COD)</option>
        </select>
    </div>

      {/* Payment */}
      <div className="mt-6 flex justify-between">
        <button
           onClick={handleButtonClick}
          disabled={isPaymentDone}
          className="bg-teal-500 text-white px-6 py-3 rounded-md"
        >
          {paymentMethod === 'payment' ? 'Go to Payment' : 'Place Order'}
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
