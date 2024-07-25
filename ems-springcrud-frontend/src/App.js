import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmployeeForm from './components/EmployeeForm';
import DepartmentForm from './components/DepartmentForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/empform' element={<EmployeeForm/>}/>  
        <Route path='/deptform' element={<DepartmentForm/>}/>  
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
