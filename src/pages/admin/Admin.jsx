import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserList } from "../../actions/userActions.jsx";
import {useNavigate} from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.userList);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  const handleDetailClick = (userId) => {
    // Handle the details action, e.g., navigate to user detail page or open a modal
    console.log("Show details for user:", userId);
    navigate(`/user/${userId}`);
  };

  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.profile?.userType || "N/A"}</td>
              <td>{user.profile?.is_verified ? 'Verified' : 'Not verified'}</td>
              <td>
                <button onClick={() => handleDetailClick(user.id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Admin;
