import { useState } from "react";
import axios from "axios";
import '../selectPlayer/select.css';
import { useNavigate } from "react-router-dom";
export const SelectPlayer =()=>{
    const [getId,setGetId] = useState("");
    const navigate = useNavigate();
    const handleIdChange = (e) => {
        setGetId(e.target.value);
    };
    const PlayerNav =()=>{
        axios.get(`http://localhost:8080/verifyPlayer/${getId}`)
          .then(response => {
            // Handle the response if needed
            if(response.data==="YES")
            {
              navigate(`/auction/${getId}`);
            }
            else
            {
              window.alert("Player is already sold");
            }
          })
          .catch(error => {
            // Handle the error if needed
            window.alert(error);
          });
    }
    return(
        <>
        <div className="fix">
            <div className="selectContainer">
                <input type="text" placeholder="Enter Player ID" id="email" required value={getId} onChange={handleIdChange}/><br/>
                <button onClick={PlayerNav}>Lets! Start Bidding...</button>
            </div>
        </div>
        </>
    );
}