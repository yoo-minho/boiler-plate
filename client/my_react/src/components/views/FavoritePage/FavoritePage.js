import React, {useEffect,useState} from 'react'
import './favorite.css'
import Axios from 'axios'

function FavoritePage() {

    const [FavoriteMovies, setFavoriteMovies] = useState([])

    let variables = {
        userFrom : localStorage.getItem('userId')
    }

    useEffect(() => {
        
        Axios.post('/api/favorite/getFavoriteMovies', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteMovies(response.data.favotitedMovies)
                } else {
                    alert('음슴');
                }
            })


    }, [])


    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thread>
                    <tr>        
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thread>
                <tbody>
                    {FavoriteMovies && FavoriteMovies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.movieTitle}</td>
                            <td>{movie.runTime} mins</td>
                            <td><button>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
