import './App.css';
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index';
import RegisterPag from './pages/RegisterPag';


function App() {

  return (
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Index/>}/>
              <Route path='/register' element={<RegisterPag/>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
  );
}



export default App;
