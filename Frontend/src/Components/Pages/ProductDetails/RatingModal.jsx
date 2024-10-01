import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addRatings } from '../../../Utils/productApi.js';

function RatingModal({ showModal, setShowModal, productId }) {
    const [rating, setRating] = useState(0); // User-selected rating
    const [comment, setComment] = useState('');
    const [photo, setPhoto] = useState(null); // Store the selected photo

    const handleRatingClick = (rate) => {
        setRating(rate);
    };

    const handlePhotoUpload = (e) => {
        // Store the first file selected
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!rating || !comment) {
            toast.error('Please provide a rating and a comment');
            return;
        }

        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('rating', rating);
        formData.append('comment', comment);
        if (photo) {
            formData.append('reviewImages', photo); // Append the selected photo
        }

        try {
            const response = await addRatings(formData);
            if (response.status === 201) {
                toast.success(response.data.message);
                setShowModal(false);
            } else if (response.status === 200) {
                toast.success(response.data.message);
                setShowModal(false);
            }
            else {
                toast.error('Failed to submit the review');
            }
            console.log("Form Data Submitted:", formData);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('An error occurred while submitting the review');
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl mb-4 text-teal-700">Rate the Product</h2>

                        {/* Form */}
                        <form onSubmit={handleSubmitReview} encType='multipart/form-data'>
                            {/* Star Selection */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <i
                                        key={index}
                                        className={`fas fa-star text-3xl cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        onClick={() => handleRatingClick(index + 1)}
                                    />
                                ))}
                            </div>

                            {/* Comment Box */}
                            <textarea
                                className="w-full border p-2 rounded mb-4"
                                rows="4"
                                placeholder="Write your review here..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />

                            {/* Photo Upload */}
                            <div className="mb-4">
                                <label className="block text-sm mb-1 text-teal-700">Upload Photo (optional):</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end">
                                <button
                                    type="button" // Change to button to not trigger form submission
                                    onClick={() => setShowModal(false)}
                                    className="mr-2 py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit" // Submit button for the form
                                    className="py-2 px-4 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default RatingModal;
