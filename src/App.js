import { Container, Table } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Home from './components/Home';
import { ToastContainer, toast } from 'react-toastify';
import {Routes, Route, Link} from 'react-router-dom'
import Login from './components/Login';
function App() {

  return (
    <>
      <div className='app-container'>
        <Header/>
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/users' element={<TableUsers/>}></Route>
            <Route path='/login' element= {<Login/>}></Route>
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
}

export default App;
