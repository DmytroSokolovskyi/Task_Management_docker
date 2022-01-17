import {useFormValid, useInput} from "../../hooks";
import {Link} from "react-router-dom";
import MyButton from "../../components/UI/myButton/MyButton";
import MyInput from "../../components/UI/myInput/MyInput";
import MyLoader from "../../components/UI/myLoader/MyLoader";
import cl from "./LoginPage.module.scss";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";
import {useHistory} from "react-router";

export default function LoginPage () {
    const email = useInput("", {isEmpty: true, isEmail: true});
    const password = useInput("", {isEmpty: true, isPassword: true});
    const validForm = useFormValid(email, password);
    const {loading, goLogin, error} = useAuth();
    const history = useHistory();
    const state = history.location.state;

    useEffect(() => {
        if (state) {
            email.toSetValue(state.email);
            password.toSetValue(state.password);
        }
    }, []);

    const clickLogin = async (e) => {
        e.preventDefault();
        const logPass = {
            email: email.value,
            password: password.value,
        };
        await goLogin(logPass);
    };

    return loading
        ? <MyLoader/>
        : (
            <div className={cl.loginPageDiv}>
                <h2>Sign in</h2>
                <form>
                    <span>{error}</span>
                    <MyInput
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => email.onChange(e)}
                        onBlur={(e) => email.onBlur(e)}
                        error={email.isDirty ? email.errorMessage : ""}
                        value={email.value}
                    />
                    <MyInput
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => password.onChange(e)}
                        onBlur={(e) => password.onBlur(e)}
                        error={password.isDirty ? password.errorMessage : ""}
                        value={password.value}
                    />
                </form>
                <MyButton
                    type="submit"
                    onClick={clickLogin}
                    disabled={validForm}
                >Sign in
                </MyButton>

                <div className={cl.toRegistration}>
                    <div>To create an account, go to <Link to={"/signup"}> registration</Link></div>
                </div>
            </div>
        );
}
