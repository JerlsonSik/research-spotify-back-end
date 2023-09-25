import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';

const SpotifyGetPlaylists = () => {
    
    const navigate = useNavigate();

    const CURRENT_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
    const [trackName, setTrackName] = useState()
    const [playingTrackArray, setPlayingTrackArray] = useState([])
    const [userID, setUserID] = useState("")

    useEffect(() => {
        
        //Implementing the setInterval method
        const interval = setInterval(() => {
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
    }, );

    // Actually all these is just for console.log display
    const [token,setToken] = useState("")
    const [data, setData] = useState("")
    const [playlistID,setPlaylistID] = useState("")
    const itemUriArray = []
    const allLikedSongsArray = []
    const top40ItemUriArray = []

    // useEffect to get the token 
    useEffect(() => {
             
        if(localStorage.accessToken){
            setToken(localStorage.accessToken)
        }

        // this function is getting the userid
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
     
    // handleGetUserID that trigger all the other function
    const handleGetUserID = async () => {

        let id = ""
        let listID = ""
        let listID2 = "" 

        const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me"

            await axios
                .get(PLAYLIST_ENDPOINT,{
                    headers:{
                        Authorization: "Bearer " + token,
                    },
                    
                })
                .then((response) => {
                    setData(response.data.id)
                    id = response.data.id
                    console.log("Token from set",response.data)
                    console.log("ID:",response.data.id)
                    // console.log("Timestamp:",response.data.timestamp)
                    // console.log("Token from set",response)
                    // console.log("Token from set",data)
                })
                .catch((error) => {
                    console.log(error)
                })  
        
        //handleCreatePlaylists()
        const CREATE_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/users/" 
        
        const toString = (CREATE_PLAYLIST_ENDPOINT+id+"/playlists")

        console.log(toString)
        await axios.post(toString,
                {
                    name: "Random Top40"
                },
                {
                    headers:{
                        Authorization: "Bearer " + token,
                        'Content-Type': 'application/json',
                    }
                    
                })

                .then((response) => {
                    console.log("Playlist Added Successful")
                    setPlaylistID(response.data.id)
                    listID = response.data.id
                    
                    
                })

                .catch((error) => {
                    console.log(error)
                    
                })

        await axios.post(toString,
                {
                    name: "Top 40"
                },
                {
                    headers:{
                        Authorization: "Bearer " + token,
                        'Content-Type': 'application/json',
                    }
                    
                })

                .then((response) => {
                    console.log("Playlist Added Successful")
                    setPlaylistID(response.data.id)
                    listID2 = response.data.id
                    
                    
                })

                .catch((error) => {
                    console.log(error)
                    
                })
                
        // handleGetLikedSongs()
        const GET_LIKED_SONGS_ENDPOINT = "https://api.spotify.com/v1/me/tracks?limit=50"
        let totalLiked = ""

        await axios
                .get(GET_LIKED_SONGS_ENDPOINT,{
                    headers:{
                        Authorization: "Bearer " + token,
                    },
                    
                })
                .then((response) => {
                    
                    console.log("User Liked Songs",response.data.items)
                    console.log("total",response.data.total)
                    totalLiked = response.data.total
                    
                    // if liked songs is less than 50
                    if(response.data.total <= 50){
                        if(response.data.total <= 40){
                            const array = randomUniqueNum(response.data.items.length,response.data.items.length)

                            for(let i = 0; i < array.length; i++){
                                itemUriArray.push(response.data.items[array[i]].track.uri);
                            }
                        }
                        if(response.data.total > 40){
                            // getting random number
                            const array = randomUniqueNum(response.data.items.length,40)
                            // for loop to get the track uri
                            for(let i = 0; i < array.length; i++){
                                console.log(response.data.items[array[i]].track.uri);
                                itemUriArray.push(response.data.items[array[i]].track.uri);
                            }
                        }
                    }
                    
                })
                .catch((error) => {
                    console.log(error)
                })
        
        // if liked songs is more than 50
        if(totalLiked > 50){
            const array = randomUniqueNum(totalLiked,40)
            console.log(array)
            for(let i = 0; i <= Math.floor(totalLiked / 50); i++){
                            
                const offset = i*50
                const GET_LIKED_SONGS_MORE_ENDPOINT = "https://api.spotify.com/v1/me/tracks?limit=50&offset="
                const toString = (GET_LIKED_SONGS_MORE_ENDPOINT+offset)
                await axios
                    .get(toString,{
                        headers:{
                            Authorization: "Bearer " + token,
                        },
                                    
                    })
                    .then((response) => {
                        
                        for(let i = 0; i < response.data.items.length; i++){
                            allLikedSongsArray.push(response.data.items[i])
                        }
        
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                        
            }
            console.log(allLikedSongsArray)
            for(let i = 0; i < array.length; i++){
                itemUriArray.push(allLikedSongsArray[array[i]].track.uri)
            }
        }

        if(totalLiked > 0){
            const GET_RECENT_TOP_40_LIKED_SONGS= "https://api.spotify.com/v1/me/tracks?limit=40&offset=0"
            await axios
                    .get(GET_RECENT_TOP_40_LIKED_SONGS,{
                        headers:{
                            Authorization: "Bearer " + token,
                        },
                                    
                    })
                    .then((response) => {
                        console.log("Length",response.data.items.length)
                        
                        const array = randomUniqueNum(response.data.items.length,response.data.items.length)
                        console.log("this is the array",array)
                        for(let i = 0; i < array.length; i++){
                            top40ItemUriArray.push(response.data.items[array[i]].track.uri);
                        }
        
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        }

       

        // handleAddItem 
        const ADD_ITEM_ENDPOINT = "https://api.spotify.com/v1/playlists/"
        //console.log("2"+playlistID2)
        const toString2 = (ADD_ITEM_ENDPOINT+listID+"/tracks")
        console.log("ilst is" +listID)
        console.log(toString2)
        console.log(itemUriArray)
        const toString3 = (ADD_ITEM_ENDPOINT+listID2+"/tracks")
        console.log("ilst is" +listID2)
        console.log(toString3)
        console.log(top40ItemUriArray)

        await axios.post(toString2,
            {
                uris: itemUriArray // random top 40
            },
            {
                headers:{
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json',
                }
                
            })

            .then((response) => {
                console.log("Items Added Successful")
                setPlaylistID(response)
            })

            .catch((error) => {
                console.log(error)
            })

        await axios.post(toString3,
            {
                uris: top40ItemUriArray
            },
            {
                headers:{
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json',
                }
                
            })

            .then((response) => {
                console.log("Items Added Successful")
                setPlaylistID(response)
            })

            .catch((error) => {
                console.log(error)
            })
        
        // handle update single record
        await axios 
            .patch("/survey/"+userID,{
                "top40": top40ItemUriArray,
                "randomTop40": itemUriArray
            })
            .then((response) => {
                console.log(response)
            })
        
        // Open up Spotify
        window.open("http://www.spotify.com/",'_blank')
        window.location = ("http://localhost:3000/explorespotify")
    }

    const handleCreatePlaylists = async () => {      
        const CREATE_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/users/" 
        
        const toString = (CREATE_PLAYLIST_ENDPOINT+data+"/playlists")

        console.log(toString)
        await axios.post(toString,
                {
                    name: "Top2"
                },
                {
                    headers:{
                        Authorization: "Bearer " + token,
                        'Content-Type': 'application/json',
                    }
                    
                })

                .then((response) => {
                    console.log("Playlist Added Successful")
                    setPlaylistID(response.data.id)
                    
                })

                .catch((error) => {
                    console.log(error)
                    
                })    

    } 

    const handleGetLikedSongs = async () => {
        const GET_LIKED_SONGS_ENDPOINT = "https://api.spotify.com/v1/me/tracks?limit=50"
        await axios
                .get(GET_LIKED_SONGS_ENDPOINT,{
                    headers:{
                        Authorization: "Bearer " + token,
                    },
                    
                })
                .then((response) => {
                    //console.log("User Liked Songs",response.data.items[0].track.uri)
                    console.log("User Liked Songs",response.data.items)
                    //console.log(getRandomProperty(response.data.items))
                    
                    const array = randomUniqueNum(10,5)
                    
                    for(let i = 0; i < array.length; i++){
                        console.log(response.data.items[array[i]].track.uri);
                        itemUriArray.push(response.data.items[array[i]].track.uri);
                    }
                    
                })
                .catch((error) => {
                    console.log(error)
                })  
    }

    const handleAddItem = async () => {
        const ADD_ITEM_ENDPOINT = "https://api.spotify.com/v1/playlists/"
        //console.log("2"+playlistID2)
        const toString = (ADD_ITEM_ENDPOINT+playlistID+"/tracks")
        console.log(playlistID)
        console.log(toString)
        console.log(itemUriArray)

        await axios.post(toString,
            {
                uris: itemUriArray
            },
            {
                headers:{
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json',
                }
                
            })

            .then((response) => {
                console.log("Items Added Successful")
                setPlaylistID(response)
            })

            .catch((error) => {
                console.log(error)
            })

    }

    const getCurrentPlaying = async () => {
        const CURRENT_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"
        await axios
                .get(CURRENT_PLAYING_ENDPOINT,{
                    headers:{
                        Authorization: "Bearer " + token,
                    },
                    
                })
                .then((response) => {
                    //console.log("User Liked Songs",response.data.items[0].track.uri)
                    console.log("Listening track name:",response.data)
                    console.log("Listening track name:",response.data.item.name)
                    console.log("Listening track playlist:",response.data.context.uri)
                    console.log("Listening track timestamp:",response.data.timestamp)
                    //console.log(getRandomProperty(response.data.items))
                    
                })
                .catch((error) => {
                    console.log(error)
                })
    }

    function randomUniqueNum(range, outputCount) {

        let arr = []
        for (let i = 0; i <= range; i++) {
          arr.push(i)
        }
      
        let result = [];
      
        for (let i = 1; i <= outputCount; i++) {
          const random = Math.floor(Math.random() * (range - i));
          result.push(arr[random]);
          arr[random] = arr[range - i];
        }
      
        return result;
    }

    // This is the function that trigger everythings
    const handleStartSpotify = async () => {
        console.log("Start Here")
        handleGetUserID()
        //handleGetLikedSongs()
        //handleAddItem()
    }

    const getArray = async () => {
        console.log(playingTrackArray)
    }

    const getSingleRecord = async () => {
        await axios
            .get("/survey/"+userID)
            .then((response) => {
                console.log("Message",response)
            })
    }

    const updateSingleRecord = async () => {
        await axios 
            .patch("/survey/"+"newnew",{
                "top40": ["88"],
            })
            .then((response) => {
                console.log(response)
            })
    }

    return ( 
        <div>
            <button className="SpotifyUser-Button" onClick={handleStartSpotify}>Go to Spotify</button>
        </div>
     );
}
 
export default SpotifyGetPlaylists;