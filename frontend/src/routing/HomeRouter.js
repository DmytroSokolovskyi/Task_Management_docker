import {Redirect, Route, Switch} from "react-router-dom";
import ActivationPage from "../pages/activationPage/ActivationPage";
import Tasks from "../components/tasks/Tasks";

export default function HomeRouter () {
    return (
        <Switch>
            <Route exact={true} path={"/"} component={Tasks}/>
            <Route exact path={"/activate/:token"} component={ActivationPage}/>
            <Redirect to={"/"}/>
        </Switch>
    );
}
