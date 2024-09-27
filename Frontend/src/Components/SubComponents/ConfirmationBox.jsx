import React from 'react';

function ConfirmationBox({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null; // Do not render anything if modal is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onCancel}
                    >
                        No
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationBox;
