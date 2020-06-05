import React, {useEffect} from 'react'

function MovieDetail(props) {

    let movieId = props.match.params.movieId;

    useEffect(() => {
        const endpoint = `${API_URL}movie/${movieId}/credit?api_key=${API_KEY}&language=en-US&page=1`
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            
        })
    })

    return (
        <div>
            123
        </div>
    )
}

export default MovieDetail
