import NextButton from "./NextButton";
import useCheckBox from "./useCheckBox";
import { Link } from 'react-router-dom';

const optionNine = ['Multiple times a day', 'Daily','Few times of week','Once a week','Rarely']
const optionTen = ['Home','Car','Work/Office','Gym','Outdoors','Public transportation','Other (please specify):']
const optionEleven = ['Yes', 'No']


const QuestionThree = () => {

    const handleClick = () => {
        window.location.href = 'https://cyberball.empirisoft.com/web?cbe=614af0d6-cfa2-4db9-851a-7ea41c0d0c91&condition=1&pid=';
    }

    return ( 
    <form>
        <div>
            <label>9. How often do you listen to music? </label>
            <useCheckBox optionArray = {optionNine} />
        </div>
        <div>
            <label>10.Where do you typically listen to music? </label>
            <useCheckBox optionArray = {optionTen} />
        </div>
        <div>
            <label>11. Have you ever received any formal training?</label>
            <useCheckBox optionArray = {optionEleven}/>
        </div>
        <div>
            <label>12. If yes, please specify the type of music training you have received (e.g., instrument lessons, vocal training, music theory classes, etc.)</label>
            <input type="text"></input>
        </div>
        <div>
         <button>
        <a href="https://cyberball.empirisoft.com/web?cbe=614af0d6-cfa2-4db9-851a-7ea41c0d0c91&condition=1&pid=">
          Next
        </a>
        </button>  
        </div>
        
    </form>
     );
}
 
export default QuestionThree;
