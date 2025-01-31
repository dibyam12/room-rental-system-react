import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyRegister } from "../../actions/userActions.jsx";
import { useNavigate } from "react-router-dom";

const RegisterVerify = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    maritalStatus: "",
    spouseName: "",
    occupation: "",
    phoneNumber: "",
    email: "",
    permanentAddress: "",
    passportPhoto: null,
    citizenshipFront: null,
    citizenshipBack: null,
    
  });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.fatherName) errors.fatherName = "Father's Name is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.permanentAddress)
      errors.permanentAddress = "Address is required";
    
    if (!formData.passportPhoto)
      errors.passportPhoto = "Passport-sized photo is required";
    if (!formData.citizenshipFront)
      errors.citizenshipFront = "Citizenship (Front) photo is required";
    if (!formData.citizenshipBack)
      errors.citizenshipBack = "Citizenship (Back) photo is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      setIsSubmitted(true);
    }
    const data = new FormData
    for (const key in formData){
       if (formData[key]) {
        data.append(key, formData[key]);
      }
    }
    data.forEach((value, key) => {
      console.log(key, value);  // This will log each field name and its value
    });
    console.log(data)
    dispatch(verifyRegister(data));
  };

  

  return (
    
    <>
      {isSubmitted ? (
         <>
        <div role="alert" className="alert alert-success p-4 top-0 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Verification form submitted successfully!</span>
        </div>
        {
          navigate("/")
        }
         </>

      ) : (
        <div className="verification-form  mt-auto w-full  ">
          <h2 className="text-center mb-6 text-2xl font-bold mt-4 text-white">
            User Verification Form
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex justify-center w-full flex-row "
          >
            <div className="w-[50%] min-w-lg p-8 bg-cyan-600 border border-cyan-800 mt-5 shadow-lg rounded-l-lg  ">
              {/* Personal Information */}
              <h3 className="mt-4 mb-4 text-lg font-semibold text-white border-b pb-2">
                Personal Information
              </h3>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                {formErrors.fullName && (
                  <span className="text-red-600 text-sm">
                    {formErrors.fullName}
                  </span>
                )}
              </div>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Family Information */}
              <h3 className="mt-4 mb-4 text-lg font-semibold text-white border-b pb-2">
                Family Information
              </h3>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Father&apos;s Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
              {formData.maritalStatus === "married" && (
                <div className="form-group mb-4">
                  <label className="block font-semibold text-gray-700 mb-1">
                    Spouse Name
                  </label>
                  <input
                    type="text"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}

              {/* Other Information */}
              <h3 className="mt-4 mb-4 text-lg font-semibold text-white border-b pb-2">
                Other Information
              </h3>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div className="w-[50%] min-w-lg p-8 bg-cyan-600 border border-cyan-800 mt-5 shadow-lg rounded-r-lg  ">
              {/* Address */}
              <h3 className="mt-4 mb-4 text-lg font-semibold text-white border-b pb-2">
                Address
              </h3>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Permanent Address
                </label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Document Upload */}
              <h3 className="mt-4 mb-4 text-lg font-semibold text-white border-b pb-2">
                Document Upload
              </h3>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Passport-sized Photo
                </label>
                <input
                  type="file"
                  name="passportPhoto"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Citizenship Photo (Front)
                </label>
                <input
                  type="file"
                  name="citizenshipFront"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  Citizenship Photo (Back)
                </label>
                <input
                  type="file"
                  name="citizenshipBack"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
             
              <button
                type="submit"
                className="w-full p-3 text-white bg-green-600 rounded-lg text-lg font-bold transition duration-300 hover:bg-green-700 active:bg-green-800"
              >
                Submit for Verification
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterVerify;
