import cl from "./MyInput.module.scss";

export default function MyInput ({children, ...props}) {
    if (props.type === "phone") {
        return (
            <label className={cl.myInputLabel}>
                <span>{children}</span>
                <div className={cl.prefixInput}>
                    <div className={cl.prefix}>+38</div>
                    <input {...props} className={cl.myInput}/>
                </div>
                <span className={cl.myInputSpan}>{props.error}</span>
            </label>
        );
    }

    if (props.type === "textarea") {
        return (
            <label className={cl.myInputLabel}>
                <span className={cl.childrenSpan}>{children}</span>
                <textarea {...props} className={cl.myInput}/>
                <span className={cl.myInputSpan}>{props.error}</span>
            </label>
        );
    }

    return (
        <label className={cl.myInputLabel}>
            <span className={cl.childrenSpan}>{children}</span>
            <input {...props} className={cl.myInput}/>
            <span className={cl.myInputSpan}>{props.error}</span>
        </label>
    );
};
