import { useState } from 'react';
import './Home.css';
import NextButton from './NextButton';
import { Link } from 'react-router-dom';

const Home = () => {
    const [agree, setAgree] = useState(false);

    const chechboxHandler = () => {
        console.log(agree);
        setAgree(!agree);
    }

  return (
    <div>
        <header className = "Home-header">
            <p className='Home-about'>
            ABOUT SURVEY
            </p>

            <p className='Home-content-1'>
            Sports psychologists have observed that athletes with strong mental visualization skills and effective stress management techniques exhibit outstanding performance during critical moments. These athletes’ resilient somatosensory and auditory cortices have been identified as being associated with their peak performance levels upon demand. Based on these findings, the present study aims to explore the impact of activating the auditory cortex on mitigating stress levels resulting from a mentally demanding visualization task that can simultaneously impose burdens on visual imagery activations as well as elicit affective and physiological sensations. The current study explores this linkage among a non-athlete population to eliminate potential factors co-occurring in the physical strength and the training of athletes, which may contribute to their ability to deliver peak performance upon demand.  
            </p>

            <p className='Home-content-2'>
            In everyday life, we naturally use music to realign the auditory and somatosensory cortices. Hence, in this research, we are using music listening as an auditory stimulus, chosen by you, to explore the relationship between the mental stress resulting from an adverse visualization task and its association with auditory simulation closer to a naturally occurring manner. Our study is divided into three parts. In the first phase, you are asked to fill out three sets of questionnaires that assess demographics, individual differences, and your music preferences as baselines. In the second phase, you will participate in a mental visualization task called Cyberball. This phase consists of watching an animation where you will use your imagination to engage in a ball-tossing game with two other computer-generated virtual players. It is important that keep your level of engagement in playing the virtual ball-tossing game to imagine the other two virtual players as people you know. Please immerse yourself in the game as realistically as possible. Following this game, you will briefly answer two sets of questionnaires. In the final phase of our study, you will log in to your Spotify account to play music of your choice. You can select a song in a generated playlist of ten randomly chosen tracks from your Liked Songs, or you can explore new music until the allocated time of 10 minutes is up.  While listening to your choice of music, you are free to switch to a different song if you wish and discover songs you may like.   
            </p>

            <div>
                <input type="checkbox" onChange={chechboxHandler} />
                <label> I agreed to the terms and conditions</label>

            </div>
            
            <Link to="/userid"><NextButton disabled = {!agree}></NextButton></Link>
        </header>
            
    </div>
    
  );
}

export default Home;
