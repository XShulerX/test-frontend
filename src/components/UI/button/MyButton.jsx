import React from "react";
import classes from "./MyButton.module.css";

const MyButton = ({ children, ...props }) => {
    var classNames = require('classnames');
    var btnClasses = classNames(classes.myBtn, props.className)
    return (
        <button {...props} className={btnClasses}>
            {children}
        </button>
    );
};

export default MyButton;
