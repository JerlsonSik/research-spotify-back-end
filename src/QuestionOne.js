import useCheckBox from "./useCheckBox";
import { Link } from 'react-router-dom';
import { useState } from "react";

const optionTwo = ['Male', 'Female', 'Other (please specify):' ]
const optionThree = ['African American/Black','Asian','Caucasian/White','Hispanic/Latino','Middle Eastern', 'Native American/Indigenous','Pacific Islander', 'Mixed Race','Other (please specify):']


const QuestionOne = () => {
    const [optionOne,setOptionOne] = useState('')
    const [optionTwo,setOptionTwo] = useState('')
    const {render, optionValue} =  useCheckBox({optionArray: optionTwo})

    const handleSubmit = async (e) => {
        console.log({optionOne})
        
    }

    const [check,setCheck] = useState("false");

    const checkInput = (inputValue) => {
        
        if(!inputValue.target.value.trim() ){
            //setCheck = "false"
            setCheck("false");
            console.log({check})
        }

        if(inputValue.target.value.trim() ){
            //setCheck = "false"
            setCheck("true");
            console.log({check})
        }

        
    }

    return ( 
    <form onSubmit={handleSubmit}>
        <div>
            <label>1. Age: </label>
            <input 
            type = "number" 
            onChange={(e) => setOptionOne(e.target.value)}
            value = {optionOne}/>
            
        </div>
        <div>
            <label>2. Gender:</label>
            {render}

        </div>
        <div>
            <label>3. Ethnicity:</label>
            {/* <useCheckBox optionArray={optionThree} />
            {render} */}
        </div>
        <div>
            <label>4. Primary Language you speck: </label>
            <input type = "text" />
        </div>
        <div>
            <label>5. Country you live: </label>
            <input type = "text" />
        </div>
        <button>Next</button>
    </form>
     );
}
 
export default QuestionOne;
