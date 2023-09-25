import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Spotify.css';

const CLIENT_ID = "ce27b5b63fa94b90b98bc7261357473b"
const CLIENT_SECRET = "982333282ecf4557ac8391349f257b0b"
const REDIRECT_URL = "http://localhost:3000/spotifyuser"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize?"
const SCOPES = ["user-read-currently-playing","user-read-playback-state","playlist-read-private","user-read-recently-played","user-library-read",
                "playlist-modify-public","playlist-modify-private","user-read-private","user-read-email"]
const toString = (SPOTIFY_AUTHORIZE_ENDPOINT+"client_id="+CLIENT_ID+"&redirect_uri="+REDIRECT_URL+"&scope="+SCOPES+"&response_type=token&show_dialog")

const Spotify = () => {

    const [userID,setUserID] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const goToHomePage = () => navigate('/userid');

        const fetchData = async () => {
            // get the data from the api
            const sessionData = await fetch('/survey');
            // convert data to json
            const json = await sessionData.json();
            
            setUserID(json.userID)

            console.log(json.userID)

            if(!sessionData.ok){
                goToHomePage()
            }

        }

        fetchData()

    })

    const handleLogIn = () => {

        window.location = (toString)
        
    }


    return ( 
        <div className="Spotify-Background">
            {/* <h1>This is the spotify page</h1>
            <h1>{userID}</h1> */}
            <button className="Spotify-Button" onClick={handleLogIn}>Logged in spotify</button>
        </div>
        
     );
}
 
export default Spotify;