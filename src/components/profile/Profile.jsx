import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRegistrationDetail } from "../../actions/userActions.jsx";
import { backendUrl } from "../../constants/userConstants.jsx";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import blankProfile from "../../assets/blankProfile.png";

const Profile = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const registrationDetail = useSelector((state) => state.registrationDetail);
  const { user } = registrationDetail;
  console.log(user.passportPhoto)
  useEffect(() => {
    dispatch(fetchRegistrationDetail());
  }, [dispatch]);
  return (
    <div className=" flex items-center justify-center mt-9">
      {/* {userInfo?.username}
      {userInfo?.email}
      {userInfo?.profile?.phone_number}
      {userInfo?.profile?.userType}
      {userInfo?.profile?.is_verified} */}
      {/* {user?.image && <img src={`${backendUrl}/${user.image}`} />}
      {user?.image1 && <img src={`${backendUrl}/${user.image1}`} />}
      {user?.image2 && <img src={`${backendUrl}/${user.image2}`} />}
      {user?.image3 && <img src={`${backendUrl}/${user.image3}`} />} */}

      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="bg-cyan-600 h-60 flex justify-center items-center ">
          <div className="w-[206px] h-[206px] rounded-full overflow-hidden outline outline-white outline-8 top-[25px] relative ">
            {user?.passportPhoto ? (
              <>
                {" "}
                <img
                  className="w-full h-full"
                  src={`${backendUrl}/${user?.passportPhoto}`}
                  // src={userInfo.passportPhoto}
                  alt="Shoes"
                />
              </>
            ) : (
              <>
                {" "}
                <img className="w-full h-full" src={blankProfile} alt="Shoes" />
              </>
            )}
            <img
              className="w-full h-full"
              src={`${backendUrl}${userInfo?.registerVerify?.passportPhoto}`}
              alt="Shoes"
            />
          </div>
        </div>
        <div className="card-body">
          <div>
            <h2 className="card-title">{userInfo?.first_name}</h2>
            <p className="mt-0">{userInfo?.email}</p>
          </div>

          <p>
            <strong>Username :</strong>
            &nbsp;{userInfo?.username} <br />
            <strong>User Type :</strong>
            &nbsp; {userInfo?.profile?.userType} <br />
          </p>
          <div className="card-actions flex      justify-end">
            {userInfo.profile?.is_verified ? (
              <div
                className="bg-green-500 text-white font-semibold w-[120px] flex items-center pl-3 rounded-full
           "
              >
                Verified &nbsp; <GoVerified className="h-9 w-6" />
              </div>
            ) : (
              <Link to="/register-verify">
                <button className="btn btn-primary">Verify Now</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
