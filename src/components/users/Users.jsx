import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserList} from "../../actions/userActions.jsx";
import {backendUrl} from "../../constants/userConstants.jsx";
import axios from "axios";
const Users = () => {
    const {userId} = useParams()
      const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.userList);
  let userMain = {}
  users.map(user => {
      if (user.id === Number(userId)) {
          userMain = user
      }
  })
    const handleToggleVerifyUser = async (userId) => {
    try {
      await axios.post(`${backendUrl}/toggle-verify-user/${userId}/`);
      alert("User verification status updated");
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
        <div>
            {userMain?.username}
            {userMain?.registerVerify.name}
            {userMain?.email}
            {userMain?.profile.phone_number}
            {userMain?.profile.userType}
            
            {userMain?.registerVerify?.image && <img src={`${backendUrl}/${userMain?.registerVerify?.image}`}/>}
            {userMain?.registerVerify?.image1 && <img src={`${backendUrl}/${userMain?.registerVerify?.image1}`}/>}
            {userMain?.registerVerify?.image2 && <img src={`${backendUrl}/${userMain?.registerVerify?.image2}`}/>}
            {userMain?.registerVerify?.image3 && <img src={`${backendUrl}/${userMain?.registerVerify?.image3}`}/>}
            
            
            {userMain?.profile.isVerified ? 'Verified' : 'Not verified'}
            <button onClick={() => handleToggleVerifyUser(userMain.id)}>
                {userMain.profile?.is_verified ? "Unverify" : "Verify"}
            </button>
        
        </div>
    );
};

export default Users;