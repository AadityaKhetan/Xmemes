import './App.css';
import AddMeme from './components/AddMeme';
import TitleBar from './components/TitleBar';
import AllMemes from './components/AllMemes';
import { ToastContainer } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import {BrowserRouter as Router,Route, useParams,Switch} from 'react-router-dom'
import UpdateMeme from './components/UpdateMeme';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Router>
        
        <ToastContainer />
        <TitleBar /> 

          <Row>
            <Col>
            <Switch>
              <Route path="/" component={AllMemes} exact/>
              <Route path="/add-meme" component={AddMeme} exact/>
              <Route path="/update-meme" component={UpdateMeme} exact/>
              <Route component={NotFound}/>
            </Switch>
            </Col>
          </Row>
      
      </Router>
      
    </div>
  );
}

export default App;
