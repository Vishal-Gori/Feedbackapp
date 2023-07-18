import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Thankyou from './Thankyou';
// import About from './About';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import AdminLogin from './AdminLogin';
import CreateFeedback from './CreateFeedback';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        {/* <Route path="/about" element={<About/>}/> */}
        <Route path="/fp" element={<ForgotPassword/>}/>
        <Route path="/cp" element={<ChangePassword/>}/>
        <Route path='/addfeedback' element={<CreateFeedback/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/thankyou' element={<Thankyou/>}/>
        <Route path="*" element={<Home/>}/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;