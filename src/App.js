import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import About from './About';
import CreateReview from './CreateReview';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/fp" element={<ForgotPassword/>}/>
        <Route path="/cp" element={<ChangePassword/>}/>
        <Route path='/addreview' element={<CreateReview/>}/>
        <Route path="*" element={<Home/>}/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;