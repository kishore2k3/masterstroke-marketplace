import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../auctionPage/auction.css';

const PlayerSold = ({data,amount})=>{
  const [teamname,setTeamname] = useState('');
  const navigate = useNavigate();
  const handleUnSold = () =>{
    navigate('/select')
  }
  const handleSold = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/updatePlayer/${teamname}/${amount}/${data.playerid}/${data.category}/${data.nationality}`)
      .then(response => {
        // Handle successful response
        if(response.data===1)
        {
          navigate(`/playerstatus/${data.playerid}`);
        }
        else
        {
          window.alert(response.data);
        }
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  };
  return(
    <>
    <div className="container-sold">
        <label>TEAM_NAME</label>
        <input type="text" onChange={(e) => setTeamname(e.target.value)}/><br/>
        <button onClick={handleUnSold}>UNSOLD</button>
        <button onClick={handleSold}>SOLD</button>
    </div>
    </>
  );
}

// -------------------------------------------------------------------------------

const Bidding = ({bidLabel,setBidLabel,data,amount,setAmount,str,setStr}) =>{
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 38) {
        setBidLabel("BIDDING AMOUNT");
        setAmount((prevAmount) => {
          var newAmount = prevAmount;
          if(prevAmount>=500){
            newAmount = newAmount + 50;
          }
          else if(prevAmount>=100){
            newAmount = newAmount + 20;
          }
          else{
            newAmount = newAmount + 10;
          }
          setStr(
            newAmount >= 0 && newAmount <= 200
            ? `${newAmount}L`
            : `${Math.floor(newAmount / 100)}.${newAmount % 100}CR`
            );
            return newAmount;
          });
        } else if (event.keyCode === 40) {
          setAmount((prevAmount) => {
            var newAmount = prevAmount;
            if(prevAmount>500){
              newAmount = newAmount - 50;
            }
            else if(prevAmount>100){
              newAmount = newAmount - 20;
            }
            else{
              newAmount = newAmount -10;
            }
          setStr(
            newAmount > 0 && newAmount<=200
            ? `${newAmount}L`
            : `${Math.floor(newAmount / 100)}.${newAmount % 100}CR`
          );
          return newAmount;
        });
      }
    };
  
    window.addEventListener("keydown", handleKeyPress);
  
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [amount, setAmount, setBidLabel, setStr, str]);
  return(
    <>
      <div className="container-bid">
        <label>{bidLabel}</label>
        <h2>{str}</h2>
      </div>
    </>
  );
}

// ------------------------------------------------------------------------------------------------

export const AuctionPage =()=>{
    const [data,setData] = useState("");
    const { id } = useParams(); 
    const [bidLabel,setBidLabel] = useState("STARTING BID")
    const [amount,setAmount] = useState(0)
    const [str,setStr] = useState("");
    const navigate = useNavigate();
    const handleNext = () =>{
      navigate('/select')
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/getData/${id}`);
          setData(response.data);
          setAmount(response.data.baseprice);
          setStr( `${response.data.baseprice}L`)
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchData();
    }, [id]);
    return(
        <div className="fix1">
          <div className='inline1'>
              <div className='stats1'>
                <img src={data.stats} alt={data.playername} />
              </div><br/>
              <div  className='playerDiv1'>
                <img src={data.playerphoto} alt={data.playername} />
                <h3>{data.playerid}-{data.playername}</h3>
              </div>
                <Bidding bidLabel = {bidLabel} setBidLabel={setBidLabel} data={data} amount={amount} setAmount={setAmount} str={str} setStr={setStr}/>
                <PlayerSold data={data} setData={setData} amount={amount} id={id}/>
                <button className="buttonNext" onClick={handleNext}></button>
          </div>
        </div>
    );
}