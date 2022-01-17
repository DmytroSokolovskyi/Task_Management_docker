import {checkAuth, destroyTokens, logOut, login, saveTokens} from "../services";
import {deleteUser, setUser} from "../redux/actions";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context";
import {useDispatch} from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    const {setIsAuth} = useContext(AuthContext);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const check = async () => {
        try {
            setLoading(true);

            const res = await checkAuth();

            setIsAuth(true);
            dispatch(setUser(res.data));

            setError("");
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    };

    const goLogin = async (logPass) => {
        try {
            setLoading(true);

            const res = await login(logPass);
            const {access_token, refresh_token, user} = res.data;

            setIsAuth(true);
            saveTokens(access_token, refresh_token);
            dispatch(setUser(user));

            setError("");
        } catch (e) {
            setError("Wrong email or password");
        } finally {
            setLoading(false);
        }
    };

    const goLogOut = async () => {
        try {
            setLoading(true);

            const res = await logOut();

            if (res.status === 204) {
                setIsAuth(false);
                destroyTokens();
                dispatch(deleteUser());
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(async () => {
        await check();
    }, []);

    return {
        error,
        loading,
        goLogin,
        goLogOut,
        check,
    };
};
