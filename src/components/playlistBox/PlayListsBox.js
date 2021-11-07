import React, { useEffect, useState } from 'react'
import './PlayListsBox.css';

const getSavedPlaylists = () => {
    const playlists = localStorage.getItem("saved playlists");
    if (playlists) return JSON.parse(playlists);
    else return [];
}

function PlayListsBox(props) {

    const [savedPlaylists, setSavedPlaylists] = useState(getSavedPlaylists);

    useEffect(() => {
        localStorage.setItem("saved playlists", JSON.stringify(savedPlaylists));
    }, [savedPlaylists]);

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDragStart = (e, item) => {
        e.dataTransfer.setData("id", JSON.stringify(item));
    }

    const onDrop = (e, cat) => {
        let item = JSON.parse(e.dataTransfer.getData("id"));
        setSavedPlaylists((prevList) => [...prevList, item]);
        localStorage.setItem("saved playlists", JSON.stringify(savedPlaylists));
    }

    const removePlaylists = (id) => {
        const lists = JSON.parse(localStorage.getItem("saved playlists"));

        const newLists = lists.filter((item, ind) => {
            if (ind !== id) {
                return item;
            }
        });

        setSavedPlaylists(newLists);
    }

    return (
        <div className="container-fluid">
            <div className="left_pane">
                <div className="playlists_box">
                    <h1 className="heading">Featured Playlists</h1>
                    <div className="playlists_content">{
                        props.playlists.length > 0 && props.playlists.map((item, ind) => {
                            return <div className="card" key={ind}>
                                <img
                                    src={item.images[0].url}
                                    className="card-img draggable"
                                    onDragStart={(e) => onDragStart(e, item)}
                                    draggable
                                    alt="Thumbnail" />
                                <div className="middle">
                                    <h2>{item.tracks.total}</h2>
                                    <a href={item.external_urls["spotify"]} className="tracks">tracks</a>
                                </div>
                            </div>
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="right_pane">
                <div className="playlists_box droppable"
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e, "saved")}>
                    <h1 className="heading" >Saved Playlists</h1>
                    <div className="playlists_content">{
                        savedPlaylists && savedPlaylists.map((item, id) => {
                            return <div className="card" key={id} >
                                <img
                                    src={item.images[0].url}
                                    className="card-img draggable"
                                    alt="Thumbnail" />
                                <div className="middle">
                                    <h2>{item.tracks.total}</h2>
                                    <a href={item.external_urls["spotify"]} className="tracks">tracks</a>
                                    <a href="##" className="remove" onClick={() => removePlaylists(id)}>remove</a>
                                </div>
                            </div>
                        })
                    }</div>
                </div>
            </div>
        </div>
    )
}

export default PlayListsBox;
