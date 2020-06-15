import React, {useEffect,useState} from 'react'
import './favorite.css'
import Axios from 'axios'
import {Popover} from 'antd'
import {IMG_BASE_URL} from '../../../Config'
import NavBar from '../NavBar/NavBar'

function FavoritePage() {

    const [FavoriteMovies, setFavoriteMovies] = useState([])

    let variables = {
        userFrom : localStorage.getItem('userId')
    }

    useEffect(() => {
        fetchFavoriteMovie();
    }, [])

    const fetchFavoriteMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovies', variables)
        .then(response => {
            if(response.data.success){
                setFavoriteMovies(response.data.favotitedMovies)
            } else {
                alert('음슴');
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                fetchFavoriteMovie();
            } else {
                alert('음슴');
            }
        })

    }

    const renderCards = FavoriteMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.moviePost ? 
                    <img src={`${IMG_BASE_URL}w500${movie.moviePost}`}/> : "no image"}
            </div>
        )

        return (
        <tr key={index}>
            <Popover content={content} title={`${movie.movieTitle}`}>
            <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(movie.movieId, movie.userFrom)}>Remove</button></td>
        </tr>
        )
    })

    return (
        <NavBar content={  
            <div style={{width:'85%', margin:'3rem auto'}}>
                <h2> Favorite Movies </h2>
                <hr />

                <table>
                    <thead>
                        <tr>        
                            <th>Movie Title</th>
                            <th>Movie Runtime</th>
                            <th>Remove from favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            </div>
        }></NavBar>
    )
}

export default FavoritePage
