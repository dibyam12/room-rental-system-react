import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserList} from "../../actions/userActions.jsx";
import {backendUrl} from "../../constants/userConstants.jsx";
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
           
            {userMain?.registerVerify?.image && <img src={`${backendUrl}/${userMain?.registerVerify?.image}`} />}
            {userMain?.registerVerify?.image1 && <img src={`${backendUrl}/${userMain?.registerVerify?.image1}`} />}
            {userMain?.registerVerify?.image2 && <img src={`${backendUrl}/${userMain?.registerVerify?.image2}`} />}
            {userMain?.registerVerify?.image3 && <img src={`${backendUrl}/${userMain?.registerVerify?.image3}`} />}
            
            
            {userMain?.profile.isVerified ? 'Verified' : 'Not verified'}
        
        </div>
    );
};

export default Users;