import {useEffect, useState} from "react";

export const useFormValid = (...inputs) => {
    const [validForm, setValidForm] = useState(true);

    useEffect(() => {
        const errors = [];

        inputs.forEach(input => {
            if ((input.errorMessage && input.isDirty) || !input.isDirty) {
                errors.push("error");
            }
        });

        !errors.length ? setValidForm(false) : setValidForm(true);
    }, [...inputs]);

    return validForm;
};
