import cl from "./MyButton.module.scss";

export default function MyButton ({children, ...props}) {
    return (
        <div className={cl.buttonDiv}>
            <div className={cl.buttonLine}/>
            <button { ...props } className={ cl.myBtn }>
                { children }
            </button>
        </div>

    );
}
