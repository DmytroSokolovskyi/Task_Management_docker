import {Redirect, Route, Switch} from "react-router-dom";
import Tasks from "../components/tasks/Tasks";

export default function HomeRouter () {
    return (
        <Switch>
            {/* <Route exact={true} path={"/visits/:id"} render={(props) => { */}
            {/*    const client = props.location.state.client; */}
            {/*    // return <Visits client={client}/>; */}
            {/* }}/> */}
            <Route exact={true} path={"/"} component={Tasks}/>
            {/* <Route exact={true} path={"/clients"} component={Tasks}/> */}
            {/* <Route exact={true} path={"/teethes"} component={Teethes}/> */}
            {/* <Route exact={true} path={"/notifications"} component={Notifications}/> */}
            <Redirect to={"/"}/>
        </Switch>
    );
}
