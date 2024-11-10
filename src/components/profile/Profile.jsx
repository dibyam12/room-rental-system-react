import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchRegistrationDetail} from "../../actions/userActions.jsx";
import {backendUrl} from "../../constants/userConstants.jsx";

const Profile = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin
    const registrationDetail = useSelector((state) => state.registrationDetail);
    const {user} = registrationDetail
    useEffect(() => {
        dispatch(fetchRegistrationDetail())
    }, [dispatch])
    return (
        <div>
            {userInfo?.username}
            {userInfo?.email}
            {userInfo?.profile?.phone_number}
            {userInfo?.profile?.userType}
            {userInfo?.profile?.is_verified}
            {user?.image && <img src={`${backendUrl}/${user.image}`} />}
            {user?.image1 && <img src={`${backendUrl}/${user.image1}`} />}
            {user?.image2 && <img src={`${backendUrl}/${user.image2}`} />}
            {user?.image3 && <img src={`${backendUrl}/${user.image3}`} />}
        </div>
    );
};

export default Profile;