import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../playerStatus/playerstatus.css'
export const PlayerStatus = () =>{
    const [data,setData] = useState("");
    const { id } = useParams(); 
    const navigate =useNavigate();
    const handleNext = () =>{
        navigate('/select')
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/getData/${id}`);
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchData();
    }, [id]);
    return(
        <div className="fix1">
            <div  className='playerDiv4'>
              <img src={data.playerphoto} alt={data.playername} />
              <h3>{data.playerid}-{data.playername}</h3>
            </div>
            <div className="congrats">
                <h1>CONGRATS! {data.teamname}</h1>
                <h3>SOLD FOR {Math.floor(data.finalprice / 100)}.{data.finalprice % 100} CR</h3>
            </div>
            <button className="buttonNext" onClick={handleNext}></button>
        </div>
    );
}