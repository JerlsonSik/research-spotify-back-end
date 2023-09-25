import NextButton from "./NextButton";
import useCheckBox from "./useCheckBox";
import { Link } from 'react-router-dom';

const emotion = ['Happy', 'Sad','Calm']

const Emotion = () => {
    return ( 
        <div>
            <label>How do you feel after playing cyberball? </label>
            <useCheckBox optionArray = {emotion} />
            <div>
                <Link to="/questionthree"><NextButton disabled = {false} /></Link>
            </div>
        </div>
     );
}
 
export default Emotion;