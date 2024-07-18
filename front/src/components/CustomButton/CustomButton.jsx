const CustomButton = ({
    text,
    onClick,
    style,
    className,
    animation,
    children,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            style={{ ...style, ...animation }}
            className={className}
            {...props}
        >
            <span>{text}</span>
            {children}
        </button>
    );
};

export default CustomButton;
