import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyRegister } from "../../actions/userActions.jsx";

const RegisterVerify = () => {
    const dispatch = useDispatch();
    
    const [name, setName] = useState('');
    const [images, setImages] = useState({
        image: null,
        image1: null,
        image2: null,
        image3: null,
    });

    // Function to handle image input changes
    const handleImageChange = (e, key) => {
    setImages({
        ...images,
        [key]: e.target.files[0],
    });
};
    // Form submit handler
   
   const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    // formData.append('user', 1);

    if (images.image) formData.append('image', images.image);
    if (images.image1) formData.append('image1', images.image1);
    if (images.image2) formData.append('image2', images.image2);
    if (images.image3) formData.append('image3', images.image3);

    // Log FormData for debugging
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    // Dispatch the form data as a payload
    dispatch(verifyRegister(formData));
    console.log(formData)
};

    
    
    return (
        <div className="background">
            <div className="wrapper-register active">
                <div className="form-box">
                    <h1 className="font-black text-2xl text-center">Verification Details</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <FaUser className="icon" />
                            <input
                                required
                                type="text"
                                name="fullName"
                                placeholder="Original Name"
                                className="form-input px-4 py-3 rounded-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div className="input-box">
                            <MdEmail className="icon" />
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                className="form-input px-4 py-3 rounded-full"
                                onChange={(e) => handleImageChange(e, 'image')}
                            />
                        </div>
                        
                        <div className="input-box">
                            <MdEmail className="icon" />
                            <input
                                type="file"
                                accept="image/*"
                                name="image1"
                                className="form-input px-4 py-3 rounded-full"
                                onChange={(e) => handleImageChange(e, 'image1')}
                            />
                        </div>
                        
                        <div className="input-box">
                            <MdEmail className="icon" />
                            <input
                                type="file"
                                accept="image/*"
                                name="image2"
                                className="form-input px-4 py-3 rounded-full"
                                onChange={(e) => handleImageChange(e, 'image2')}
                            />
                        </div>
                        
                        <div className="input-box">
                            <MdEmail className="icon" />
                            <input
                                type="file"
                                accept="image/*"
                                name="image3"
                                className="form-input px-4 py-3 rounded-full"
                                onChange={(e) => handleImageChange(e, 'image3')}
                            />
                        </div>
                        
                        <button
                            className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterVerify;
