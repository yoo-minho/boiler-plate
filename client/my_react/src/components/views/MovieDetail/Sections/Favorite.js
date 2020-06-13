import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom : userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/getFavoriteNumber', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('음슴');
                }
            })

        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success){
                setFavorited(response.data.favorited)
            } else {
                alert('음슴');
            }
        })
        
    }, [])

    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber-1)
                        setFavorited(!Favorited)
                    } else {
                        alert('음슴');
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber+1)
                        setFavorited(!Favorited)
                    } else {
                        alert('음슴');
                    }
                })
        }
    }

    return (
        <div>
             <Button onClick={onClickFavorite}>{Favorited ? "NOT Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
