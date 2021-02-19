package com.example.xmeme_backend.services;

import com.example.xmeme_backend.dao.XmemeDAO;
import com.example.xmeme_backend.domains.Xmemes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.Map;


@Service
public class XmemeServiceImpl implements XmemeServices{

    //Implementation class of service layer interface

    //provides object of DOA class to use JPARepository methods
    @Autowired
    private XmemeDAO xmemeDAO;

    public XmemeServiceImpl() {

    }

    @Override
    public Page<Xmemes> getXmemes() {

        //creating a pageable object with size 100 and sorting records in desc order
        Pageable pageable =PageRequest.of(0,100, Sort.Direction.DESC,"Id");
        //findAll method to retrieve memes from db
        return xmemeDAO.findAll(pageable);
    }

    @Override
    public Xmemes getXmemes(long memeId) {
        //finds meme with particular id or throws 404 error
        try {
            Xmemes meme = xmemeDAO.findById(memeId).get();
            return meme;
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
        }


    }

    @Override
    public Long addXmemes(Xmemes memes) {
        //firing query to find count of duplicate meme if exists
        int c = xmemeDAO.findMeme(memes.getName(), memes.getCaption(), memes.getUrl());
        if(c==0){
            //if count is 0
            xmemeDAO.save(memes);
            return memes.getId();
        }
        else
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Data already exists");//if count is 1 throw 409

    }

    @Override
    public ResponseEntity updateXmemes(long memeId, Map<String, Object> changes) {
        //return 200 if updating meme was successful else return 404
        try {
            Xmemes meme = xmemeDAO.findById(memeId).get();//finding meme with id=memeId
            //looping through 'changes' Map and changing caption and url
            changes.forEach(
                    (change, value) -> {//change->property,value-> new value of the property
                        switch(change){
                            case "caption" : meme.setCaption((String)value);//setting caption to new value
                                break;
                            case "url" : meme.setUrl((String) value);//setting url to new value
                                break;
                        }
                    }
            );
            xmemeDAO.save(meme);//saving again wih updated values
            return ResponseEntity.ok().build();//returns 200 ok status
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");//if update failed throw 404
        }


    }
}
