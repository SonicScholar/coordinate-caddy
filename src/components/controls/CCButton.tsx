import "./CCButton.css"
type CCButtonProps = {
    buttonText: string;
    enabled?: boolean;
    buttonPressed: () =>void;
    className?: string;
}
export const CCButton = ({
    buttonText,
    enabled = true,
    buttonPressed,
    className = undefined
}:CCButtonProps) =>{

    let classNameText = "ccbutton" + (className ? ` ${className}`: "");
    if(!enabled)
        classNameText +=" disabled";
    

    return <div className={classNameText} onClick={buttonPressed}>
        {buttonText}
    </div>
}