import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../playersData/PlayersData.css';
export const PlayerData = () => {
  const [category, setCategory] = useState(''); // State to store selected category
  const [players, setPlayers] = useState([]); // State to store fetched players

  useEffect(() => {
    // Function to fetch players based on the selected category
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getDataByCategory/${category}`);
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    // Fetch players when the category changes
    if (category !== '') {
      fetchPlayers();
    }
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div className='containerPlayer'>
        <label>Category</label>
        <select onChange={handleCategoryChange} value={category}>
            <option value="">Select Category</option>
            <option value="BATSMAN">Batsman</option>
            <option value="BOWLER">Bowler</option>
            <option value="ALLROUNDER">Allrounder</option>
            <option value="WICKETKEEPER">WicketKeeper</option>
            <option value="ELITE">Elite</option>
        </select>
      </div>
      {players.length > 0 && (
        <div className='Data'>
          <h2> {category}</h2>
          <ul>        
            {players.map((player) => (
                <div className='inline'>
                    <div  className='playerDiv'>
                      <img src={player.playerphoto} alt={player.playername} />
                      <h3>{player.playerid}-{player.playername}</h3>
                    </div>
                    <div className='stats'>
                      <img src={player.stats} alt={player.playername} />
                    </div>
                </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
