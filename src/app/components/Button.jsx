import { useState } from "react";

const Button = (props) => {
    const [clicked, setClicked] = useState(false);
    return (
        <>
            <button
                style={{ ...props.styles.mainButton, margin: "10px", fontSize: "30px", color: "black" }}
                onClick={() => props.clickHandler(true)}
            > +
            </button>
        </>
    );
};
export default Button;
