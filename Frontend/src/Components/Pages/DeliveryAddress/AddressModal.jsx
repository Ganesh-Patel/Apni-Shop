import React from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddressModal({ show, handleClose, handleSave }) {
  const initialValues = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isForSelf: true,
    label: 'Home',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    street: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .matches(/^[0-9]{5,6}$/, 'Zip code must be 5-6 digits')
      .required('Zip code is required'),
    country: Yup.string().required('Country is required'),
  });

  const onSubmit = (values) => {
    handleSave(values); // Pass the form data back to the parent for saving
    handleClose(); // Close the modal after saving
  };

  if (!show) return null; // Don't render if the modal is not shown

  return (
    <div className="  fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 h-3/5 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-teal-600 mb-4">Enter Delivery Address</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <Field
                  name="firstName"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter first name"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <Field
                  name="lastName"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter last name"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <Field
                  name="mobileNumber"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter mobile number"
                />
                <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                <Field
                  name="street"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter street address"
                />
                <ErrorMessage name="street" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <Field
                  name="city"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter city"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <Field
                  name="state"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter state"
                />
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <Field
                  name="zipCode"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter zip code"
                />
                <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <Field
                  name="country"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter country"
                />
                <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address Label</label>
                <Field as="select" name="label" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </Field>
              </div>

              <div className="mb-4 flex items-center">
                <Field type="checkbox" name="isForSelf" className="mr-2" />
                <label className="text-sm text-gray-700">Is this address for yourself?</label>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-1/2 bg-teal-600 text-white rounded-md p-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/2 ml-2 bg-gray-300 rounded-md p-2"
                >
                  Cancel
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddressModal;
