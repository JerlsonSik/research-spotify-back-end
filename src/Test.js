import React, { useState, useEffect } from 'react';
import axios from "axios"

const Test = () => {
    const [count, setCount] = useState(0);
    const CURRENT_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
    const token = "BQD8Z97R2x2YUK6STsH5kPSVPtYskymCKoF-vLBn6NuokK26zvSDL6IjXjrFDbQ-_VTQeEcsBXeLrrn9-i32JChID_ggRss6PEKoYQDR-S4yPaStS1ptHe0scA_-i9g9G-ARLjjd8nPZof6plnXHljcvOY97DNZH5EGLHiLHFcPgbEMALe4fqisXMBUK23aRFAHjWyg9XjPY2623udPFlVORYk0GS-pMvN_RPAFZ965OweDXaki72LkjtEBXRAqE-p5GXt_CrTvDKKI13LjXBiTy9gdfT4S6E1n9crBNObA"
  
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
                    console.log("Listening track name:",response.data)
                    // console.log("Listening track name:",response.data.item.name)
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
    }, );
    
    

    return <h1>{count}</h1>;
}
  
export default Test;