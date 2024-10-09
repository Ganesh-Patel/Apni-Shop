import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../../Utils/ordersApi.js';

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders();
        console.log(fetchedOrders);
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleConfirmOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'Confirmed');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Confirmed' } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'Canceled');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Canceled' } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Order Dashboard</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <tr className={order.status === 'Canceled' ? 'bg-red-200' : order.status === 'Confirmed' ? 'bg-green-200' : ''}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{`${order.userId.firstname} ${order.userId.lastname}`}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleConfirmOrder(order._id)}
                    className="mr-2 px-4 py-1 bg-green-500 text-white rounded"
                    disabled={order.status === 'Confirmed' || order.status === 'Canceled'}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="mr-2 px-4 py-1 bg-red-500 text-white rounded"
                    disabled={order.status === 'Confirmed' || order.status === 'Canceled'}
                  >
                    Cancel
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  <button
                    onClick={() => toggleOrderDetails(order._id)}
                    className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
                  >
                    {expandedOrderId === order._id ? 'Hide Details' : 'Show Details'}
                  </button>
                </td>
              </tr>
              {expandedOrderId === order._id && (
                <tr>
                  <td colSpan="4" className="border px-4 py-2">
                    <div className="bg-gray-100 p-4 rounded">
                      <h3 className="font-bold">Order Details:</h3>
                      <p><strong>Address:</strong> {`${order.addressId.firstName} ${order.addressId.lastName}, ${order.addressId.mobileNumber}`}</p>
                      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                      <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                      <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                      <h4 className="font-bold">Products:</h4>
                      <ul>
                        {order.products.map((product, index) => (
                          <li key={index}>{product.name} - ${product.price.toFixed(2)}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDashboard;
