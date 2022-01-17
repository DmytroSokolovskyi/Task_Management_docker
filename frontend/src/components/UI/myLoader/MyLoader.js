import cl from "./MyLoader.module.css";

export default function MyLoader () {
    return (
        <div className={cl.loaderDiv}>
            <div className={cl.loader} id="loader">
                <div className={cl.shadow} id="shadow"> </div>
                <div className={cl.box} id="box"> </div>
            </div>
        </div>
    );
}
