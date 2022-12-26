import Landingpage from '../src/componets/Landingpage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './componets/Commons/Login.jsx'
import Registration from './componets/Commons/Registration';
import UserProfile from './componets/UserProfile';
import Managerpage from './componets/Managerpage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='/user/profile' element={<UserProfile/>}/>
          <Route path="/manager" element={ <Managerpage /> } />
        </Routes>
      </BrowserRouter>


      {/* <Landingpage></Landingpage> */}
    </div>
  );
}

export default App;
