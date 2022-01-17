import {Redirect, Route, Switch} from "react-router-dom";
import ActivationPage from "../pages/activationPage/ActivationPage";
import {AuthContext} from "../context";
import ErrorPage from "../pages/errorPage/ErrorPage";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import MyLoader from "../components/UI/myLoader/MyLoader";
import SignUp from "../pages/SignUpPage/SignUp";
import {useAuth} from "../hooks/useAuth";
import {useContext} from "react";

export default function AppRouter () {
    const {isAuth} = useContext(AuthContext);
    const {loading} = useAuth();

    return loading
        ? <MyLoader/>
        : (
            isAuth
                ? <Switch>
                    <Route path={"/"} component={HomePage}/>
                    <Route exact path={"/error"} component={ErrorPage}/>
                    <Redirect to={"/"}/>
                </Switch>
                : <Switch>
                    <Route exact path={"/activate/:token"} component={ActivationPage}/>
                    <Route exact path={"/login"} component={LoginPage}/>
                    <Route exact path={"/signup"} component={SignUp}/>
                    <Route exact path={"/error"} component={ErrorPage}/>
                    <Redirect to={"/login"}/>
                </Switch>
        );
}
