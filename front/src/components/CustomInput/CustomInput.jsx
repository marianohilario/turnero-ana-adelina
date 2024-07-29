import React, { useState, useEffect } from "react";
import styles from "./CustomInput.module.css";

const InputComponent = ({
    type = "text",
    id,
    label,
    value = "",
    onChange,
    onBlur,
    placeholder,
    iconClassName,
    className,
    error,
    loading,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [initialValue, setInitialValue] = useState(value);
    const [touched, setTouched] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    const handleBlur = (e) => {
        if (inputValue !== initialValue) {
            setTouched(true);
        }
        if (onBlur) {
            onBlur(e, inputValue !== initialValue);
        }
    };

    useEffect(() => {
        setInputValue(value);
        setInitialValue(value);
    }, [value]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
        if (touched) {
            setHasChanged(true);
        }
    };

    return (
        <div className={`${styles.inputWrapper} ${className}`}>
            <label htmlFor={id} className={styles.label}>
                <span>{label}</span>
                <div className={styles.inputContainer}>
                    {iconClassName && (
                        <i className={`${styles.icon} ${iconClassName}`} />
                    )}
                    {loading ? (
                        <i
                            className={`${styles.iconValidation} fas fa-spinner fa-spin`}
                            style={{ color: "transparent" }}
                        />
                    ) : touched && !error ? (
                        <i
                            className={`${styles.iconValidation} fas fa-check-circle`}
                            style={{ color: "green" }}
                        />
                    ) : touched && error ? (
                        <i
                            className={`${styles.iconValidation} fas fa-times-circle`}
                            style={{ color: "red" }}
                        />
                    ) : (
                        <i></i>
                    )}

                    <input
                        type={type}
                        id={id}
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        className={`${styles.input} ${
                            touched && error ? styles.inputError : ""
                        }`}
                        {...props}
                    />
                </div>
            </label>
            <p className={styles.errorMessage}>{error ? error : ""}</p>
        </div>
    );
};

export default InputComponent;
