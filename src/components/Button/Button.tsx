import "./Button.css"

type ButtonProps = {
    text: string;
    handleClick: () => void;
}

function Button({ text, handleClick }: ButtonProps){
    return(
        <button 
            className="light-button"
            onClick={handleClick}    
        >
            { text }
        </button>
    )
}
export default Button;