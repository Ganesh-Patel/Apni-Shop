import React, { useState, useRef } from 'react';

function UpdatteCouponsModal({ coupon, onClose, refreshCoupons, onUpdate }) {
  const [selectedId, setSelectedId] = useState(coupon?._id || '');
  const [code, setCode] = useState(coupon?.code || '');
  const [discount, setDiscount] = useState(coupon?.discount || '');
  const [expirationDate, setExpirationDate] = useState(coupon?.expirationDate || '');
  const [description, setDescription] = useState(coupon?.description || '');

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();

    const updatedCoupon = {
      code,
      discount,
      expiryDate:expirationDate,
      description,
    };

    try {
      const response = await onUpdate(selectedId, updatedCoupon);
      refreshCoupons();
      onClose();
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 h-4/5 max-h-[100vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Coupon</h2>
        <form onSubmit={handleUpdateCoupon}>
          {/* Coupon Code */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="code"
            />
          </div>

          {/* Discount Percentage */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="discount"
            />
          </div>

          {/* Expiration Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              name="expirationDate"
            />
          </div>

          {/* Description */}
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

export default UpdatteCouponsModal;
