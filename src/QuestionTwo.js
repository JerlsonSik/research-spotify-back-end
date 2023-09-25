import NextButton from "./NextButton";
import useCheckBox from "./useCheckBox";
import { Link } from 'react-router-dom';

const optionSix = ['Yes', 'No']
const optionSeven = ['Less than 1 year','1-3 years','3-5 years','More than 5 years']
const optinoEight = ['Free','Premium','Family Plan','Student Plan']

 


const QuestionTwo = () => {

    return ( 
    <form>
        <div>
            <label>6. Are you a Spotify user? </label>
            <useCheckBox optionArray = {optionSix} />
        </div>
        <div>
            <label>7. If yes, how long have you been a Spotify user? </label>
            <useCheckBox optionArray={optionSeven} />
        </div>
        <div>
            <label>8. What type of Spotify membership do you have?</label>
            <useCheckBox optionArray={optinoEight} />
        </div>
        <div>
            <Link to="/questionthree"><NextButton disabled = {false} /></Link>
        </div>
        
    </form>
     );
}
 
export default QuestionTwo;
