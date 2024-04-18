import './App.css';
import { Routes, Route } from "react-router-dom";
import { PlayerData } from './playersData/PlayersData';
import { SelectPlayer } from './selectPlayer/select';
import { AuctionPage } from './auctionPage/auction';
import { TeamStatus } from './teamStatus/teamstatus';
import { TeamPlayer } from './teamStatus/teamPlayer';
import { PlayerStatus } from './playerStatus/playerstatus';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<PlayerData/>}></Route>
      <Route path='/select' element={<SelectPlayer/>}></Route>
      <Route path='/auction/:id' element={<AuctionPage/>}></Route>
      <Route path='/teamstatus' element={<TeamStatus/>}></Route>
      <Route path='/playerstatus/:id' element={<PlayerStatus/>}></Route>
      <Route path='/teamplayers/:id' element={<TeamPlayer/>}></Route>
    </Routes>
    </>
  );
}

export default App;
