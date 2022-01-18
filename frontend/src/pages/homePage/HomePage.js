import Header from "../../components/ header/Header";
import HomeRouter from "../../routing/HomeRouter";
import cl from "./HomePage.module.scss";

export default function HomePage () {
    return (
        <div className={cl.wrapper}>
            <div className={cl.header}>
                <Header/>
            </div>
            <div className={cl.main}>
                <HomeRouter/>
            </div>
        </div>
    );
};
