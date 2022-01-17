import cl from "./MyCheckBox.module.scss";

export default function MyCheckBox ({...props}) {
    return (
        <label className={cl.container}>
            <input {...props} type="checkbox"/>
            <span className={cl.checkmark}/>
        </label>
    );
}
