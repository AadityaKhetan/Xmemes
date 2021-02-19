import React from "react";
import { useHistory } from "react-router-dom";
import { Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg,
    Button, 
    Container,
    ButtonGroup} from "reactstrap";
import '../styles/Meme.css';

const Meme = ({ meme }) => {

    const history = useHistory();
    

    return(
        <Container style={{width : "40rem"}}>
            <Card className="homecard">
            <CardBody>
                <CardTitle tag="h5">{meme.name}</CardTitle>
                <CardText>{meme.caption}</CardText>
                <CardImg height="450rem" src={meme.url} alt="Card image cap" />
                <br></br><br></br>
                <ButtonGroup>
                <Button color="primary" outline onClick={()=>{
                    console.log(meme.id);
                    localStorage.setItem('meme_id',meme.id);//storing meme_id in local storage
                    history.push("/update-meme");//navigating to UpdateMeme.js
                }}>Edit</Button>
                </ButtonGroup>
            </CardBody>
            </Card>
        </Container>
        
    )
}

export default Meme;