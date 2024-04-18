import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../teamStatus/teamstatus.css'
export const TeamStatus = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/getTeam')
      .then(response => {
        setTeamData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div className='fix1'>
    <div className='container-table'>
      <h1>Team Data</h1>
      <table>
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Batsman</th>
            <th>Bowler</th>
            <th>Wicketkeeper</th>
            <th>All-Rounder</th>
            <th>Indian</th>
            <th>Overseas</th>
            <th>Team Name</th>
            <th>Used Amount</th>
            <th>Purse</th>
            <th>Total Players</th>
            {/* <th>Total Credit</th> */}
          </tr>
        </thead>
        <tbody>
          {teamData.map(team => (
            <tr key={team.teamid}>
              <td>{team.teamid}</td>
              <td>{team.batsman}</td>
              <td>{team.bowler}</td>
              <td>{team.wicketkeeper}</td>
              <td>{team.allrounder}</td>
              <td>{team.indian}</td>
              <td>{team.overseas}</td>
              <td>{team.teamname}</td>
              <td>{Math.floor((team.totalamount - team.purse) / 100)}.{(team.totalamount - team.purse) % 100}CR</td>
              <td>{Math.floor(team.purse / 100)}.{team.purse % 100}CR</td>
              <td>{team.totalplayers}</td>
              {/* <td>{team.totalcredit}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

