import {useFetch, useFormValid, useInput} from "../../hooks";
import {Link} from "react-router-dom";
import MyButton from "../../components/UI/myButton/MyButton";
import MyInput from "../../components/UI/myInput/MyInput";
import MyLoader from "../../components/UI/myLoader/MyLoader";
import cl from "./SignUp.module.scss";
import {createUser} from "../../services";
import {useHistory} from "react-router";

export default function SignUp () {
    const username = useInput("", {isEmpty: true, minLength: 3, maxLength: 30});
    const email = useInput("", {isEmpty: true, isEmail: true});
    const password = useInput("", {isEmpty: true, isPassword: true});
    const passwordRepeat = useInput("", {isEmpty: true, isPassword: true, isPasswordMatched: password.value});
    const validForm = useFormValid(email, password, username, passwordRepeat);
    const {goFetch, error, loading} = useFetch();
    const history = useHistory();

    const clickCreate = (e) => {
        e.preventDefault();
        const newUser = {
            username: username.value,
            email: email.value,
            password: password.value,
        };
        goFetch(createUser(newUser)).then(res => {
            if (res.status === 201) {
                history.push("/login", newUser);
            }
        });
    };

    return loading
        ? <MyLoader/>
        : (
            <div className={cl.signUpPageDiv}>
                <h2>Create account</h2>
                <form>
                    <span>{error}</span>
                    <MyInput
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => username.onChange(e)}
                        onBlur={(e) => username.onBlur(e)}
                        error={username.isDirty ? username.errorMessage : ""}
                        value={username.value}
                    />
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
                    <MyInput
                        type="password"
                        placeholder="Repeat your password"
                        onChange={(e) => passwordRepeat.onChange(e)}
                        onBlur={(e) => passwordRepeat.onBlur(e)}
                        error={passwordRepeat.isDirty ? passwordRepeat.errorMessage : ""}
                        value={passwordRepeat.value}
                    />
                </form>
                <MyButton
                    type="submit"
                    onClick={clickCreate}
                    disabled={validForm}
                >Create
                </MyButton>

                <div className={cl.toLogin}>
                    <div>Already have an account? <Link to={"/login"}> Sign in</Link></div>
                </div>
            </div>
        );
}
