import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate} from 'react-router-dom';
import './ExploreSpotify.css';

const ExploreSpotify = () => {

    const navigate = useNavigate();

    const CURRENT_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
    const [trackName, setTrackName] = useState()
    const [playingTrackArray, setPlayingTrackArray] = useState([])
    const [token,setToken] = useState("")
    const [count, setCount] = useState(0);
    const [userID, setUserID] = useState("")

    useEffect(() => {
             
        if(localStorage.accessToken){
            setToken(localStorage.accessToken)
        }

        const goToHomePage = () => navigate('/userid');

        const fetchData = async () => {
            // get the data from the api
            const sessionData = await fetch('/survey');
            // convert data to json
            const json = await sessionData.json();
            
            setUserID(json.userID)

            console.log("UserID",json.userID)

            if(!sessionData.ok){
                goToHomePage()
            }

        }

        fetchData()
        
    },[])

    useEffect(() => {
        
        console.log({count})
        if(count<60){
            
        
            //Implementing the setInterval method
            const interval = setInterval(() => {
                setCount(count+1)
                axios
                    .get(CURRENT_PLAYING_ENDPOINT,{
                        headers:{
                            Authorization: "Bearer " + token,
                        },
                        
                    })
                    .then((response) => {
                        //console.log("User Liked Songs",response.data.items[0].track.uri)
                        
                        if(response.data.item.name !== trackName){
                            console.log("New Tracks")
                            console.log("Listening track name:",response.data.context.uri)
                            console.log("Listening track name:",response.data.item.name)
                            setTrackName(response.data.item.name)
                            setPlayingTrackArray(playingTrackArray => [...playingTrackArray, [response.data.timestamp,response.data.item.name,response.data.context.uri]])
                        }
                        
                        // console.log("Listening track playlist:",response.data.context.uri)
                        // console.log("Listening track timestamp:",response.data.timestamp)
                        //console.log(getRandomProperty(response.data.items))
                        
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }, 1000);
    
            //Clearing the interval
            return () => clearInterval(interval);
            // return () => {setTimeout(()=>{
            //     clearInterval(interval)
            //     console.log("Interval Cleared")
            // },60000)}
        }else{
            // handle update single record
            axios 
            .patch("/survey/"+userID,{
                "playedSong": playingTrackArray
            })
            .then((response) => {
                console.log(response)
                window.location = ("https://purdue.ca1.qualtrics.com/jfe/form/SV_3wwnGJR5XZIuMS2")
            })
        }
        
    }, );

    return ( 
        <div className="ExploreSpotify-Background">
            <h2 className="ExploreSpotify-H2">You would have 5 minutes to explore spotify</h2>
        </div>
    );
}
 
export default ExploreSpotify;