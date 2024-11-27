import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserList } from "../../actions/userActions.jsx";
import { backendUrl } from "../../constants/userConstants.jsx";
import { GoVerified } from "react-icons/go";
import blankProfile from "../../assets/blankProfile.png";
import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import swal from "sweetalert2";

import axios from "axios";
const Users = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userList);
  let userMain = {};
  users.map((user) => {
    if (user.id === Number(userId)) {
      userMain = user;
    }
  });
  console.log(userMain);
  const handleToggleVerifyUser = async (userId) => {
    try {
      await axios.post(`${backendUrl}/toggle-verify-user/${userId}/`);
      // alert("User verification status updated");
      swal.fire({
        title: "User verification status updated",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      dispatch(fetchUserList());
    } catch (err) {
      console.error("Error updating verification status:", err);
      alert("Failed to update verification status");
    }
  };

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center mt-9 flex-col">
      {loading && <span className="loading loading-spinner text-info"></span>}
      {/* {userMain?.username}
      {userMain?.registerVerify.name}
      {userMain?.email}
      {userMain?.profile.phone_number}
      {userMain?.profile.userType} */}
      {/* 
      {userMain?.registerVerify?.image && (
        <img src={`${backendUrl}/${userMain?.registerVerify?.image}`} />
      )}
      
      
      {userMain?.registerVerify?.image3 && (
        <img src={`${backendUrl}/${userMain?.registerVerify?.image3}`} />
      )} */}

      <div className="card bg-base-100 w-full shadow-xl p-3 mb-10">
        <div className="bg-cyan-600 h-60 flex justify-end items-center ">
          <div className="w-[206px] h-[206px] rounded-full overflow-hidden outline outline-white outline-8 top-[35px] mr-8 relative ">
            {userMain.image ? (
              <>
                {" "}
                <img
                  className="w-full h-full"
                  src={userMain.profile_image}
                  alt="Shoes"
                />
              </>
            ) : (
              <>
                {" "}
                <img
                  className="w-full h-full"
                  src={blankProfile}
                  alt="profile"
                />
              </>
            )}
          </div>
        </div>
        <div className="card-body">
          <div>
            <h2 className="card-title">{userMain?.first_name}</h2>
            <p>
              <strong>Username :</strong>
              &nbsp;{userMain?.username} <br />
              <strong>User Type :</strong>
              &nbsp; {userMain?.profile?.userType} <br />
              <strong>E-mail :</strong>
              &nbsp; {userMain?.email} <br />
              <strong>Date Of Birth:</strong>
              &nbsp; {userMain?.registerVerify?.date_of_birth} <br />
              
           
              <br />
              <br />
              <strong className="card-title">Verification Documents: </strong>
            </p>{" "}
            <br />
            {userMain?.registerVerify?.passportPhoto && (
              <>
                <strong>Photo: </strong>
                <div className=" w-[20%] h-[20%] overflow-hidden ml-[20%]  rounded-box">
                  <img
                    className="w-full h-full object-cover"
                    src={`${backendUrl}/${userMain?.registerVerify?.passportPhoto}`}
                  />
                </div>
              </>
            )}
            <br />
            <strong>Citizenship front and back: </strong>
            <div className="flex  flex-col lg:flex-row ml-[20%]">
              {userMain?.registerVerify?.citizenshipFront && (
                <div className="card bg-base-300 rounded-box  h-[25%] w-[25%]  overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`${backendUrl}/${userMain?.registerVerify?.citizenshipFront}`}
                  />
                </div>
              )}
              <div className="divider lg:divider-horizontal"></div>
              {userMain?.registerVerify?.citizenshipBack && (
                <div className="card bg-base-300 rounded-box   h-[25%] w-[25%] overflow-hidden  ">
                  <img
                    className="w-full h-full object-cover"
                    src={`${backendUrl}/${userMain?.registerVerify?.citizenshipBack}`}
                  />
                </div>
              )}
            </div>
            <br />
          
            <br />
          </div>
          <div className="card-actions flex justify-end">
            {userMain.profile?.is_verified ? (
              <div
                className="bg-green-500 text-white font-semibold w-[120px] flex items-center pl-3 rounded-full
           "
              >
                Verified &nbsp; <GoVerified className="h-9 w-6" />
              </div>
            ) : (
              <div
                className="bg-red-500 text-white font-semibold w-[145px] flex items-center pl-3 rounded-full
         "
              >
                Unverified &nbsp; <BiErrorCircle className="h-9 w-6" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {userMain.profile?.is_verified ? (
          ""
        ) : (
          <>
            <button
              className="btn btn-secondary "
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Reject Verification
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Reason for rejection</h3>
                <textarea
                  className="textarea my-2 py-4 w-full textarea-error"
                  placeholder=" Write here"
                ></textarea>
              </div>
            </dialog>
          </>
        )}
        <button
          onClick={() => handleToggleVerifyUser(userMain.id)}
          className="btn btn-primary m-3"
        >
          {userMain.profile?.is_verified ? "Unverify" : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default Users;
