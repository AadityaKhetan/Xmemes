package com.example.xmeme_backend.controller;

import com.example.xmeme_backend.domains.Xmemes;
import com.example.xmeme_backend.services.XmemeServices;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController

public class XMemesController {

    //The rest controller class where all the client requests are directed.

    private final XmemeServices xmemeServices;//Obect of service layer class which fetches data from MySQL

    public XMemesController(XmemeServices xmemeServices){
        this.xmemeServices = xmemeServices;
    }

    @CrossOrigin //Since we are calling this controller from react based application
    @GetMapping("/memes") // used for handling get requests with endpoint "/memes"
    public Page<Xmemes> getXmemes(){
        //will return a page containing  100 memes in reverse chronological order
        return this.xmemeServices.getXmemes();
    }

    @CrossOrigin
    @GetMapping("/memes/{memeId}") // used for handling get requests with endpoint "/memes/{id}"
    public Xmemes getXmemes(@PathVariable String memeId){
        //will return single meme object with id equal to passed ID.
        return this.xmemeServices.getXmemes(Long.parseLong(memeId));
    }

    @CrossOrigin
    @PostMapping(value="/memes",produces = {"application/json; charset=UTF-8"})// used for handling post requests with endpoint "/memes"
    @ResponseBody
    public String addXmemes(@RequestBody Xmemes memes) throws JSONException {

                long id = xmemeServices.addXmemes(memes);//gets the id of newly created meme.
                JSONObject json = new JSONObject();//initialising json object
                json.put("id",id);//adding returned id to json prooperty "id"
                return json.toString(); //returning it as string


    }

    @CrossOrigin
    @PatchMapping("/memes/{memeId}")//used for handling patch request with endpoint "/memes/{id}"
    public ResponseEntity updateXmemes(@PathVariable String memeId, @RequestBody Map<String, Object> changes){
        //returns 404 error code if meme with {id} doesn't exist else return 200 status code.
        return this.xmemeServices.updateXmemes(Long.parseLong(memeId),changes);
    }
}
