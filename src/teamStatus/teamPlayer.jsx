import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
export const TeamPlayer = () =>{
    const [teamData, setTeamData] = useState([]);
    const { id }= useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(id);
                const response = await axios.get(`http://localhost:8080/getTeamPlayer/${id}`);
                console.log(response.data)
                setTeamData(response.data);
              } catch (error) {
                console.error(error);
              }
        };
        fetchData();
    }, [id]); 

    return (
        <div className='fix1'>
        <div className='container-table'>
        <h1>Team {id}</h1>
        <table>
            <thead>
            <tr>
                <th>Player Id</th>
                <th>Player Name</th>
                <th>Catergory</th>
                <th>Nationality</th>
                <th>Final Price</th>
                {/* <th>Points</th> */}
            </tr>
            </thead>
            <tbody>
            {teamData.map(team => (
                <tr key={team.playerid}>
                <td>{team.playerid}</td>
                <td>{team.playername}</td>
                <td>{team.category}</td>
                <td>{team.nationality}</td>
                <td>{Math.floor(team.finalprice / 100)}.{team.finalprice % 100}CR</td>
                {/* <td>{team.point}</td> */}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        </div>
    );
}