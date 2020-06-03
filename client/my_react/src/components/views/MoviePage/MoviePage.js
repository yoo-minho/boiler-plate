import React, {useState, useEffect} from 'react'
import {API_URL, API_KEY, IMG_BASE_URL} from '../../../Config'
import MainImage from './Sections/MainImage'

function MoviePage() {
    
    const [Movies, setMovies] = useState([])
    const [MainMovieImg, setMainMovieImg] = useState(null)

    useEffect(() => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([response.results]);
            setMainMovieImg(response.results[0]);
        })

        console.log(Movies)
        console.log(MainMovieImg)

    }, [])

    return (
        <div style={{width:'100%', margin:'0'}}>
            
            {/*메인이미지*/
            MainMovieImg &&            
            <MainImage image={`${IMG_BASE_URL}w1280/${MainMovieImg.backdrop_path}`}/>
            }
      
            <div style={{width:'85%', margin:'1rem auto'}}>

                <h2>Movies by latest</h2>
                <hr/>

                {/*무비그리드*/}

            </div>

            <div style={{display:'flex', justifyContent:'center'}}>
                <button>Load More</button>
            </div>

        </div>
    )
}

export default MoviePage
