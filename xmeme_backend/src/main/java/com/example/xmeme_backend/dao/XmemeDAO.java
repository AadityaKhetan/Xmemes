package com.example.xmeme_backend.dao;

import com.example.xmeme_backend.domains.Xmemes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface XmemeDAO extends PagingAndSortingRepository<Xmemes, Long> {
    //DAO layer class
    //extends PagingAndSortingRepository to sort memes and retrive latest 100 memes as a single page.

    //method to check for duplicate record while posting a new meme.
    //@Query to fire custom sql queries
    @Query(value = "Select count(*) from xmemes x where x.name=:name and x.caption=:caption and x.url=:url",nativeQuery = true)
    int findMeme(@Param("name") String name, @Param("caption") String caption, @Param("url") String url);
    //takes 3 paramaters i.e. name,caption and url of meme in POST request body
}
