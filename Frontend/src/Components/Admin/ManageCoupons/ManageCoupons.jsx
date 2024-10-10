import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Contexts/UserContext.jsx';
import AddCoupon from './AddCoupons.jsx'; 
import ConfirmationBox from '../../SubComponents/ConfirmationBox.jsx'; 
import UpdateCouponModal from './UpdatteCouponsModal.jsx'; 
import { deleteCoupon, getAllCoupons, updateCoupon } from '../../../Utils/couponsApi.js';

function ManageCoupons() {
  const { isLoggedIn } = useContext(UserContext);
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null); 
  const [actionMessage, setActionMessage] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch all coupons when the component loads
  useEffect(() => {
    if (isLoggedIn) {
      loadCoupons();
    }
  }, [isLoggedIn]);

  const loadCoupons = async () => {
    try {
      const response = await getAllCoupons();
      console.log(response);
      setCoupons(response);
      setFilteredCoupons(response);
    } catch (error) {
      toast.error('Failed to fetch coupons');
      console.error('Error fetching coupons:', error);
    }
  };

  // Handle search filtering
  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const response = await getAllCoupons(term);
      setFilteredCoupons(response.data.allCoupons);
    } else {
      setFilteredCoupons(coupons);
    }
  };

  // Handle action selection
  const handleAction = (action, coupon) => {
    setSelectedCoupon(coupon); // Store the entire coupon object
    setSelectedAction(action);
    if (action === 'delete') {
      setActionMessage('Are you sure you want to delete this coupon?');
    } else if (action === 'edit') {
      setActionMessage('Are you sure you want to edit this coupon?');
    } else if (action === 'disable') {
      setActionMessage('Are you sure you want to disable this coupon?');
    }
    setConfirmOpen(true); // Open confirmation modal
  };

  const handleConfirmAction = async () => {
    setConfirmOpen(false); // Close confirmation box before proceeding

    if (selectedAction === 'delete') {
      try {
        console.log('coupon for which we are deleting ',selectedCoupon._id)
        const response = await deleteCoupon(selectedCoupon._id); // API to delete coupon
        if (response) {
          toast.success('Coupon deleted successfully');
          loadCoupons();
        } else {
          toast.error('Failed to delete coupon');
        }
      } catch (error) {
        toast.error('Error while deleting coupon');
        console.error(error);
      }
    } else if (selectedAction === 'edit') {

      setEditModalOpen(true); 
    } else if (selectedAction === 'disable') {
      // Implement disable coupon logic here
    }
  };


  const updateCoup=async(selectedId, updatedCoupon)=>{
    const response =await updateCoupon(selectedId, updatedCoupon);
    if(response){
      toast.success('Coupon updated successfully');
      loadCoupons();
      }else{
        toast.error('Failed to update coupon');
        }
  }

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6">Manage Coupons</h1>
      
      {/* Add Coupon Button */}
      <div className="mb-4">
        <button
          onClick={openModal}
          className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-900"
        >
          Create Coupon
        </button>
      </div>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by coupon ID or name"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Coupons Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-300 p-2">Coupon ID</th>
              <th className="border border-gray-300 p-2">Coupon Code</th>
              <th className="border border-gray-300 p-2">Discount</th>
              <th className="border border-gray-300 p-2">Expiry Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map((coupon) => (
              <tr key={coupon._id} className="bg-gray-100 text-center">
                <td className="border border-gray-300 p-2">{coupon._id}</td>
                <td className="border border-gray-300 p-2">{coupon.code}</td>
                <td className="border border-gray-300 p-2">{coupon.discount}</td>
                <td className="border border-gray-300 p-2">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{coupon.isActive ? 'Active' : 'Disabled'}</td>
                <td className="border border-gray-300 p-2">
                  {/* Action Dropdown */}
                  <select
                    className="border rounded px-2 py-1"
                    onChange={(e) => handleAction(e.target.value, coupon)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Action
                    </option>
                    <option value={coupon.isActive ? 'disable' : 'enable'}>
                      {coupon.isActive ? 'Disable' : 'Enable'}
                    </option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Coupon Modal */}
      {isEditModalOpen && (
        <UpdateCouponModal
          isOpen={isEditModalOpen}
          coupon={selectedCoupon}
          refreshCoupons={loadCoupons}
          onClose={() => setEditModalOpen(false)}
          onUpdate={updateCoup} 
        />
      )}

      {/* Confirmation Box Modal */}
      <ConfirmationBox
        isOpen={isConfirmOpen}
        message={actionMessage}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Add Coupon Modal */}
      {
        isModalOpen && (
          <AddCoupon isOpen={isModalOpen} onClose={closeModal}  />
        )
      }
      
    </div>
  );
}

export default ManageCoupons;
