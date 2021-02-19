package com.example.xmeme_backend.domains;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Xmemes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)//Primary key generation method
    private long id;//Primary Key

    //fields for entity Xmemes
    private String name;
    private String caption;
    private String url;

    public Xmemes() {
    }

    public Xmemes(long id, String name, String caption, String url) {
        this.id = id;
        this.name = name;
        this.caption = caption;
        this.url = url;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Xmemes{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", caption='" + caption + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
