import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserList } from "../../actions/userActions.jsx";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  const handleDetailClick = (userId) => {
    // Handle the details action, e.g., navigate to user detail page or open a modal
    console.log("Show details for user:", userId);
    navigate(`/user/${userId}`);
  };

  return (
    <>
      {/* <table border="1" cellPadding="10" cellSpacing="0">
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
      </table> */}

      <div role="tablist" className="tabs mt-5 p-2 tabs-lifted">
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab font-semibold !w-max"
          aria-label="All Users"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <table className="table text-white">
              {/* head */}
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
                  <tr key={user.id} className="hover">
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.profile?.userType || "N/A"}</td>
                    <td>
                      {user.profile?.is_verified ? "Verified" : "Not verified"}
                    </td>
                    <td>
                      {user.profile?.is_verified ? (
                        <button
                          onClick={() => handleDetailClick(user.id)}
                          className="btn bg-cyan-600 text-white"
                        >
                          Details
                        </button>
                      ) : (
                        ""
                      )}
                      {/* <button
                        onClick={() => handleDetailClick(user.id)}
                        className="btn bg-cyan-600 text-white"
                      >
                        Details
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab"
          aria-label="Unverified"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <table className="table text-white">
              {/* head */}
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
                {users
                  .filter((user) => !user.profile?.is_verified) // Filter not verified users
                  .map((user) => (
                    <tr key={user.id} className="hover">
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.profile?.userType || "N/A"}</td>
                      <td>
                        {user.profile?.is_verified
                          ? "Verified"
                          : "Not verified"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDetailClick(user.id)}
                          className="btn bg-cyan-600 text-white"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab"
          aria-label="Verified"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <table className="table text-white">
              {/* head */}
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
                {users
                  .filter((user) => user.profile?.is_verified)
                  .map((user) => (
                    <tr key={user.id} className="hover">
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.profile?.userType || "N/A"}</td>
                      <td>
                        {user.profile?.is_verified
                          ? "Verified"
                          : "Not verified"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDetailClick(user.id)}
                          className="btn bg-cyan-600 text-white"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading && (
        <div>
          <p className="flex items-center justify-center">
            <span className="loading loading-spinner text-info"></span>
          </p>
        </div>
      )}
      {error && (
        <div>
          <p className="flex items-center justify-center">Error: {error}</p>
        </div>
      )}
    </>
  );
};

export default Admin;
