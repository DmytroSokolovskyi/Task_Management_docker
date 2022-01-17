import {useEffect, useState} from "react";
import dayjs from "dayjs";

export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(false);
    const [minLength, setMinLength] = useState(false);
    const [maxLength, setMaxLength] = useState(false);
    const [isEmailError, setEmailError] = useState(false);
    const [isPassError, setPassError] = useState(false);
    const [isPasswordMatched, setPasswordMatched] = useState(false);
    const [inFuture, setInFuture] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
            case "isEmpty":
                if (value) {
                    setEmpty(false);
                    setErrorMessage("");
                } else {
                    setEmpty(true);
                    setErrorMessage("The field cannot be empty");
                }
                break;
            case "minLength":
                if (value && (value.length < validations[validation])) {
                    setMinLength(true);
                    setErrorMessage(`No less ${validations[validation]} letters`);
                } else {
                    setMinLength(false);
                }
                break;
            case "maxLength":
                if (value && (value.length > validations[validation])) {
                    setMaxLength(true);
                    setErrorMessage(`Not more ${validations[validation]} letters`);
                } else {
                    setMaxLength(false);
                }
                break;
            case "isEmail":
                const resEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (value && (resEmail.test(value.toLowerCase()))) {
                    setEmailError(false);
                } else {
                    setEmailError(true);
                    setErrorMessage("Invalid email format");
                }
                break;
            case "isPassword":
                const resPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;
                if (value && (resPass.test(value))) {
                    setPassError(false);
                } else {
                    setPassError(true);
                    setErrorMessage("The password must consist of lowercase and uppercase letters, as well as characters № % ? !.,");
                }
                break;
            case "isPasswordMatched":
                if (value && (validations[validation] === value)) {
                    setPasswordMatched(false);
                } else {
                    setPasswordMatched(true);
                    setErrorMessage("Password mismatch");
                }
                break;
            case "inFuture":
                if (value) {
                    const dateTask = dayjs(value);
                    const diffDate = dateTask.diff(dayjs(), "day");
                    if (diffDate >= 0) {
                        setInFuture(false);
                    } else {
                        setInFuture(true);
                        setErrorMessage("You cannot set a date in the past");
                    }
                }
                break;

            default:
                return {};
            }
        }
    }, [value, validations]);

    return {
        isEmpty,
        inFuture,
        minLength,
        maxLength,
        isEmailError,
        isPassError,
        errorMessage,
        isPasswordMatched,
    };
};
