import React, { useState, useEffect } from "react";
import Meme from "./Meme";
import base_url from "./../services/api";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast} from "react-toastify";
import { Col, Container, Row } from 'reactstrap';
import { useParams } from "react-router-dom";

const AllMemes = () =>{

    useEffect(() => {
       document.title = "Memes Feed";
            getAllMemes();
    }, []);

    

    //function to call server
    const getAllMemes = () =>{
        axios.get(`${base_url}/memes`).then(
            (response) =>{
                //success
                //console.log(response);
                //console.log(response.data);
                setMemes(response.data.content);
            },
            (error) =>{
                //error
                //console.log(error);
                toast.error(error.message);
            }
        );
    };



    const [memes,setMemes]=useState([])

    return(
        <div>
            
            <Row xl="1" >
            {
                    //mapping each meme to Meme.js using map()
                    memes.length>0 ? memes.map((item)=> (
                        <Col style={{padding : "1rem"}}>
                        <Meme key = {item.id} meme={item} />
                        </Col>
                    )) : <div style={{textAlign:"center"}}>No memes</div>
            }
            </Row>
        </div>
    );
}

export default AllMemes;