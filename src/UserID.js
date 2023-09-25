import { useState} from "react";
import './UserID.css';

const UserID = () => {

    const [userIdentity,setUserIdentity] = useState("")

    const handleSubmit = async (e) => {
        
        console.log({userIDentity: userIdentity})

        e.preventDefault()

        const identity = {userIdentity: userIdentity}

        const response = await fetch('/survey',{
            method:'POST',
            body:JSON.stringify(identity),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(response.ok){
            console.log("Added new user id",json)
            window.location = ("https://purdue.ca1.qualtrics.com/jfe/form/SV_bCNsWKYawbgSAnQ")
        }else{
            console.log(json)
        }
        
    }

    return ( 
        
        <div className="UserID-Background">
            <form className="UserID-H2" onSubmit={handleSubmit}>
                <h2>Input your ID:</h2>
                <input 
                    type = "text" 
                    onChange={(e) => setUserIdentity(e.target.value)}
                    value = {userIdentity}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        
     );
}
 
export default UserID;