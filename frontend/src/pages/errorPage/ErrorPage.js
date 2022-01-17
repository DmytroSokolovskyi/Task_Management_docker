import cl from "./ErrorPage.module.css";

export default function ErrorPage () {
    return (
        <div className={cl.wrapperError}>
            <h1 className={cl.errorH1}>404</h1>
            <h3 className={cl.errorH3}>The page you are looking for cannot be found</h3>
        </div>
    );
}
