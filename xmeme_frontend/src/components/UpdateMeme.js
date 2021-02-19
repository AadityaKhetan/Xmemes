import '../styles/UpdateMeme.css';
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Form, FormGroup, Input, Button, Card,CardBody } from "reactstrap";
import base_url from "./../services/api"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import {useHistory} from "react-router-dom"


const UpdateMeme = () => {

    const isImageUrl = require('is-image-url');

    const history = useHistory();
    
    useEffect(() => {
        document.title = "Update Meme";
        getMemes();
     }, []);

    const id=localStorage.getItem('meme_id');//used to get meme_id stored in local storage previously in Meme.js


    

    const submitMeme = (e) => {
        if(currentCaption!=meme.caption || currentUrl!=meme.url){
            if(isImageUrl(meme.url)==false)
                toast.error("The entered url is incorrect i.e. it doesn't point to an image.");
            else
                updateMeme(meme);
        }else{
            toast.error("No change found in data.Cannot update");
        }
        
        e.preventDefault();

    };

    const getMemes = () =>{
        axios.get(`${base_url}/memes/${id}`).then(
            (response) =>{
                //success
                //console.log(response);
                
                setMeme(response.data);
                setCaption(response.data.caption);
                setUrl(response.data.url);
            },
            (error) =>{
                //error
                //console.log(error);
                toast.error(error.message);
            }
        );
    };
    

    const updateMeme = (data) =>{
        
        axios.patch(`${base_url}/memes/${id}`,data).then(
            (response) =>{
                //success
                //console.log(response);
                //console.log(data);
                //console.log(response.data);
                toast.success("Meme updated successfully.")
                history.push("/");
            },
            (error) =>{
                //error
                //console.log(error);
                toast.error(error.message);
            }
        );
    }
    const [meme,setMeme]=useState([]);
    const [currentCaption,setCaption]=useState("");
    const [currentUrl,setUrl]=useState("");

    const [fadeIn, setFadeIn] = useState(true);
    const toggle = () => setFadeIn(!fadeIn);

    return(
        
        <Card className="memecard" style={{margin:'50px auto ',padding:'10px',width:'50rem',height:'22rem'}}>
        <CardBody>
                <Form onSubmit = {submitMeme}>
                    <FormGroup>
                        <label for="name">Meme Owner</label>
                        <Input type = "text"
                            placeholder = "Enter your name"
                            name="name"
                            id = "name"
                            defaultValue={meme.name} disabled required> 
                        </Input>
                        <label for="caption">Meme Caption</label>
                        <Input
                            type = "textarea"
                            placeholder = "Enter meme caption"
                            name="caption"
                            id = "caption"
                            defaultValue={meme.caption} required
                            onChange = {(e) =>{
                                setMeme({ ...meme, caption:e.target.value});
                                setCaption({...currentCaption,caption:e.target.value});
                            }}>  
                        </Input>
                        <label for="url">Meme URL</label>
                        <Input
                            type = "url"
                            placeholder = "Enter image url"
                            name="url"
                            id = "url"
                            defaultValue={meme.url} required
                            onChange = {(e) =>{
                                setMeme({ ...meme, url:e.target.value});
                                setUrl({...currentUrl,url:e.target.value});
                                
                            }}>    
                        </Input>
                    </FormGroup>
                    <Button color="primary" outline type = "submit" onClick={toggle} style={{marginBottom:'30px'}}>Update</Button>
                    
                </Form>
            </CardBody>
            </Card>
    )
        
}

export default UpdateMeme;