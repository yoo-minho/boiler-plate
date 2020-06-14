import React, {useState, useEffect} from 'react'
import {API_URL, API_KEY, IMG_BASE_URL} from '../../../Config'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import { Row } from 'antd'
import NavBar from '../NavBar/NavBar'

function MoviePage(props) {
    
    const [Movies, setMovies] = useState([])
    const [MainMovieImg, setMainMovieImg] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies, ...response.results]);
            setCurrentPage(response.page);
            if(CurrentPage < 1){
                setMainMovieImg(response.results[0]); 
            } else {
                //done
            }
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endpoint)
    }

    return (
        <NavBar content={
            <div style={{width:'100%', margin:'0'}}>
                
                {/*메인이미지*/
                MainMovieImg &&            
                <MainImage 
                    image={`${IMG_BASE_URL}w1280/${MainMovieImg.backdrop_path}`}
                    title={MainMovieImg.original_title}
                    text={MainMovieImg.overview}
                />
                }
        
                <div style={{width:'85%', margin:'1rem auto'}}>

                    <h2>Movies by latest</h2>
                    <hr/>

                    <Row gutter={[16,16]}>
                        {/*무비그리드*/
                        Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landingPage
                                    image={movie.poster_path ? `${IMG_BASE_URL}w500/${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                    </Row>

                </div>

                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div>

            </div>
        }></NavBar>
    )
}

export default MoviePage
