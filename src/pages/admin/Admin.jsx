import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserList} from "../../actions/userActions.jsx";

const Admin = () => {
  const dispatch = useDispatch();
  const {users,loading,error} = useSelector(state => state.userList)
  
    {console.log(users, 'users')}
  for (let [i,j] of Object.entries(users)) {
    console.log(i,j,'sdfsf')
  }

  useEffect(()=> {
  dispatch(fetchUserList())
  }, [dispatch])
  return (
  <div>
    test
    {users.map(user => <div>{user.username}</div>)}
    
    
   
  
  </div>)
};

export default Admin;
