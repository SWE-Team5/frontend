import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Schedule from './pages/Schedule.js';
import ScheduleDetail from './pages/ScheduleDetail.js';
import Chatbot from './pages/Chatbot';
import Register from './pages/Register';
import SelectedNotice from './pages/selectedNotice.js';

function App() {
  return (
    <div className="App w-screen h-screen bg-white">
      <BrowserRouter>                                   
        <Routes>                                            
          <Route path='/' element={<Home />} />      
          <Route path='/schedule' element={<Schedule />} />      
          <Route path='/schedule/detail' element={<ScheduleDetail />} />      
          <Route path='/schedule/detail/notice' element={<SelectedNotice />} />      
          <Route path='/chatbot' element={<Chatbot />} />
          <Route path='/keywordRegister' element={<Register />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
