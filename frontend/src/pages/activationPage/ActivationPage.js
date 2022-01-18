import {Link} from "react-router-dom";
import MyLoader from "../../components/UI/myLoader/MyLoader";
import {activate} from "../../services";
import cl from "./ActivationPage.module.scss";
import {useEffect} from "react";
import {useFetch} from "../../hooks";

export default function ActivationPage ({match}) {
    const {loading, goFetch} = useFetch();

    useEffect(async () => {
        await goFetch(activate(match.params.token));
    }, []);

    return loading
        ? <MyLoader/>
        : (
            <div className={cl.wrapperError}>
                <h1 className={cl.activationTitle}>OK</h1>
                <h3 className={cl.activationMessage}>Activation was successful, go to your account <Link to={"/"}> account </Link> </h3>
            </div>
        );
}
