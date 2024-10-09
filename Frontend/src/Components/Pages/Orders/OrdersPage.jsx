// OrdersPage.js
import React, { useEffect, useState } from 'react';
import { getAllOrders, deleteOrder } from '../../../Utils/ordersApi.js';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders();
        // Sort orders by orderDate in descending order to show the latest first
        const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order ID: {order._id}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Status:</span> {order.status}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Total Price:</span> ₹{order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Discounted Price:</span> ₹{order.discountedPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Products:</h3>
                <div className="space-y-4">
                  {order.products.map((product) => (
                    <div key={product.productId} className="flex items-center space-x-4 border-b pb-4">
                      <img
                        src={product.productId.images[0]}
                        alt={product.productName}
                        className="w-24 h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">{product.productName}</h4>
                        <p className="text-gray-500">{product.productId.description}</p>
                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-800">₹{product.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-200"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
