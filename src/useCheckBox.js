import { useState } from "react";

const useCheckBox = ({optionArray}) => {

    const [selected, setSelected] = useState(null);
    const [hidden, setHidden] = useState("hidden");
    const [disabled, setDisabled] = useState("disabled");
    const [optionValue, setOptionValue] = useState("");


    const onChange = (optionID) => {
        setSelected((optionID))
        setOptionValue(optionArray[optionID])


        if(optionID === optionArray.length-1 && optionArray[optionID] === "Other (please specify):"){
            setHidden("");
            setDisabled("");
        }else{
            setHidden("hidden");
            setDisabled("disabled")
        }
        
    }

    return {
        optionValue, 
        render:(
        <div>
            {optionArray.map((option,optionID) => (
                    <div key={optionID} >

                        {<input 
                            type="checkbox"
                            checked={optionID === selected}
                            onChange={() => onChange(optionID)}
                        />}
                        
                        <label>{option}</label>
                
                </div>

                ))}
                <label hidden = {hidden}><input type="text" disabled = {disabled}/></label>
            
            
        </div>)
    };
}
 
export default useCheckBox;