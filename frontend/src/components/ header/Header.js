import MyButton from "../UI/myButton/MyButton";
import MyLoader from "../UI/myLoader/MyLoader";
import cl from "./Header.module.scss";
import {memo} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useSelector} from "react-redux";

export default memo(function Header () {
    const {goLogOut, loading} = useAuth();
    const {user} = useSelector(state => state.mainReducer);

    return loading
        ? <MyLoader/>
        : (
            <div className={cl.headerDiv}>
                <div className={cl.container}>
                    <div className={cl.rowHeader}>
                        <div>Task Management</div>
                    </div>
                    <div className={cl.buttonDiv}>
                        <MyButton onClick={goLogOut}>
                            {"LogOut"}
                        </MyButton>
                    </div>
                    {
                        !user.confirmedAt && <div className={cl.infoHeader}>
                         Dear {user.username}, please check your email and activate your account.
                        </div>
                    }

                </div>
            </div>
        );
},
);
