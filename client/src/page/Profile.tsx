import { useEffect } from "react";
import { store } from "../lib/store";
import Container from "../ui/Container";
import Registration from "../ui/Registration";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loading from "../ui/Loading";
import UserInfo from "../ui/UserInfo";


const Profile = () => {
    const currentUser = store((state) => state.currentUser);
    const getUserInfo = store((state) => state.getUserInfo);
    const isLoading = store((state) => state.isLoading);

    useEffect(()=>{

        const unSub = onAuthStateChanged(auth, (user) => {
            console.log("認証変化検知:", user);
            if(user){
                getUserInfo(user?.uid);
            }else{
                getUserInfo(null);
            }
        });
        return ()=>unSub();
    }, [getUserInfo]);

    return (
        <Container>
            {currentUser ? <UserInfo currentUser={currentUser}/> : <Registration />}
            {isLoading && <Loading />}   
        </Container>
    );
};

export default Profile;