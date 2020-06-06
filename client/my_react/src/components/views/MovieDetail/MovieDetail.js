import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMG_BASE_URL} from '../../../Config'
import { withRouter } from 'react-router-dom'
import MainImage from '../MoviePage/Sections/MainImage'
import GridCards from '../commons/GridCards'
import { Row } from 'antd'
import MovieInfo from './Sections/MovieInfo'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
            })

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US&page=1`

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);
            })
    },[])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }

    return (
        <div>
            
            {/*Header*/}

            {/*메인이미지*/
            Movie &&            
            <MainImage 
                image={`${IMG_BASE_URL}w1280/${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            }

            {/*Body*/}

            <div style={{width:'85%', margin:'1rem auto'}}>

                <div style = {{display:'flex', justifyContent:'flex-end'}}>
                    <Favorite/>
                </div>

                {/* 무비인포 */}
                {Movie && <MovieInfo movie={Movie} />}

                <br/>

                {/*액션가이드*/}

                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {ActorToggle &&
                <Row gutter={[16,16]}>
                    {/*무비그리드*/
                    Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={cast.profile_path ? `${IMG_BASE_URL}w500/${cast.profile_path}` : null}
                                characterName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                }

            </div>



        </div>
    )
}

export default withRouter(MovieDetail)
