import React, { useState } from "react";
import { createCoupon } from "../../../Utils/couponsApi";
import { Puff } from "react-loader-spinner";
import Select from 'react-select';

const categoryOptions = [
    { value: 'All', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home_appliances', label: 'Home Appliances' },
  // Add more categories as needed
];

const productOptions = [
    { value: 'All', label: 'All' },
  { value: 'product1', label: 'Product 1' },
  { value: 'product2', label: 'Product 2' },
  { value: 'product3', label: 'Product 3' },
  // Add more products as needed
];

function AddCoupon({ onClose, refreshCoupons }) {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [isPercentage, setIsPercentage] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [applicableCategories, setApplicableCategories] = useState([]);
  const [applicableProducts, setApplicableProducts] = useState([]);
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Prepare data to send to API
    const couponData = {
      code,
      discount: parseFloat(discount),
      isPercentage,
      expiryDate,
    //   applicableCategories: applicableCategories.map(cat => cat.value),
    //   applicableProducts: applicableProducts.map(prod => prod.value),
      minimumPurchaseAmount: parseFloat(minimumPurchaseAmount),
      usageLimit: parseInt(usageLimit, 10),
    };

    try {
      const response = await createCoupon(couponData);
      console.log(response)
      console.log(response.data.message)
      if (response.status=201) {
        setMessage("Coupon created successfully!");
        setSuccess(true);
        setTimeout(() => {
          setLoading(false);
          onClose(); // Close modal after success
        }, 1000);
      } else {
        setMessage("Error creating the coupon. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      setMessage("Error creating the coupon. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 h-3/5 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Create New Coupon</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="puff-loading"
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Coupon Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Discount</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Is Percentage</label>
              <input
                type="checkbox"
                checked={isPercentage}
                onChange={(e) => setIsPercentage(e.target.checked)}
                className="mr-2"
              />
              Percentage Discount
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Applicable Categories</label>
              <Select
                isMulti
                options={categoryOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setApplicableCategories}
                placeholder="Select categories"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Applicable Products</label>
              <Select
                isMulti
                options={productOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setApplicableProducts}
                placeholder="Select products"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Minimum Purchase Amount</label>
              <input
                type="number"
                value={minimumPurchaseAmount}
                onChange={(e) => setMinimumPurchaseAmount(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Usage Limit</label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {message && (
          <p className={`mt-4 ${success ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddCoupon;
