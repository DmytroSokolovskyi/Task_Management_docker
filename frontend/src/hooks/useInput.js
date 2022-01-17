import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue || "");
    const [isDirty, setDirty] = useState(false);

    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
        setDirty(true);
    };

    const toSetValue = (value) => {
        setValue(value);
        setDirty(true);
    };

    const onBlur = () => {
        setDirty(true);
    };

    const clearInput = () => {
        setDirty(false);
        setValue("");
    };

    return {
        value,
        onChange,
        onBlur,
        clearInput,
        isDirty,
        ...valid,
        setValue,
        toSetValue,
    };
};
