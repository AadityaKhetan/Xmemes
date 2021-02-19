import axios from "axios";
import '../styles/AddMeme.css';
import React, {useState, useEffect} from "react";
import { Form, FormGroup, Input, Button, Container, Card, CardBody } from "reactstrap";
import base_url from "./../services/api"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import {useHistory} from "react-router-dom"

const AddMeme = () => {

    useEffect(() => {
        document.title = "Add Meme";
     }, []);

     const history = useHistory(); 
     
    const [meme, setMeme] = useState({});

    //function to be called on form submission 
    const submitMeme = (e) => {
        postMeme(meme);
        e.preventDefault();
        resetMeme(e);
    };

    //function to be called to reset form
    const resetMeme = (e) =>{
        e.title='';
        e.caption='';
        e.url='';
    }

    // function to add data on server to database.
    const postMeme = (data) =>{
        axios.post(`${base_url}/memes`,data).then(
            (response) =>{
                //success
                //console.log(response);
                console.log(response.data);
                toast.success("Meme added successfully.");
                history.push("/");
                
            },
            (error) =>{
                //error
                if(error.message==="Request failed with status code 409")
                    toast.error("This meme already exist.");
                else
                    toast.error(error.message);
            }
        );
    }

    const [fadeIn, setFadeIn] = useState(true);
    const toggle = () => setFadeIn(!fadeIn);
    
    return(
        <Card className="memecard" style={{margin:'50px auto ',padding:'10px',width:'50rem',height:'22rem'}}>
            <CardBody>
            <Form onSubmit = {submitMeme} onReset = {resetMeme} style={{padding:'1px'}}>
                <FormGroup>
                    <label for="name">Meme Owner</label>
                    <Input
                        type = "text"
                        placeholder = "Enter your name"
                        name="name"
                        id = "name" required
                        onChange = {(e) =>{
                            setMeme({ ...meme, name:e.target.value});
                        }}>  
                    </Input>
                    <label for="caption">Meme Caption</label>
                    <Input
                        type = "textarea"
                        placeholder = "Enter meme caption"
                        name="caption"
                        id = "caption" required
                        onChange = {(e) =>{
                            setMeme({ ...meme, caption:e.target.value});
                        }}>  
                    </Input>
                    <label for="url">Meme URL</label>
                    <Input
                        type = "url"
                        placeholder = "Enter image url"
                        name="url"
                        id = "url" required
                        onChange = {(e) =>{
                            setMeme({ ...meme, url:e.target.value});
                        }}>
                    </Input>
                </FormGroup>
                <Button className="addmemebtn" outline color="primary" type = "submit" onClick={toggle}>Submit</Button>
                <Button style={{margin:"5px"}} outline color="primary" type = "reset"  onClick={toggle}>Clear</Button> 
            </Form>
            </CardBody>
            
        </Card>


    );
};

export default AddMeme;



