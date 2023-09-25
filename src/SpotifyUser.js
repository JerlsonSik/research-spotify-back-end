import { useState, useEffect } from "react";
import SpotifyGetPlaylists from "./SpotifyGetPlaylists";
import './SpotifyUser.css';

const getReturnedAuth = (hash) => {
    const stringHashTag = hash.substring(1);
    const urlParams = stringHashTag.split("&");
    const paramsSplitUp = urlParams.reduce((accumulater,currentValue) => {
        console.log(currentValue)
        const [key,value] = currentValue.split("=");
        accumulater[key]=value;
        return accumulater;
    },{})

    return paramsSplitUp
}



const SpotifyUser = () => {

    useEffect(() => {
        if(window.location.hash){
            const {access_token,expires_in, token_type} = getReturnedAuth(window.location.hash)
            
            localStorage.clear()
            localStorage.setItem("accessToken",access_token)
            localStorage.setItem("expiresIn",expires_in)
            localStorage.setItem("tokenType",token_type)
        }
    })
    


    return (  
        <div className="SpotifyUser-Background">
            <SpotifyGetPlaylists/>
        </div>
    );
}
 
export default SpotifyUser;