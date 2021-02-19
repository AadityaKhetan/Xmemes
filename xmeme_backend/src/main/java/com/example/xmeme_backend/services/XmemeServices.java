package com.example.xmeme_backend.services;

import com.example.xmeme_backend.domains.Xmemes;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.Map;



public interface XmemeServices {

    //interface for service layer

    public Page<Xmemes> getXmemes();//return a page of 100 latest memes

    public Xmemes getXmemes(long memeId);//return a single meme with id=memeId

    public Long addXmemes(Xmemes memes);//adds a new meme and return its id

    public ResponseEntity updateXmemes(long memeId, Map<String, Object> changes);//updates current meme and return response code
}
