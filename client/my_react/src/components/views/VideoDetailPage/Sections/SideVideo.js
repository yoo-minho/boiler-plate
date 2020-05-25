import React, {useEffect, useState} from 'react'
import axios from 'axios'

function SideVideo() {

    const [sideVideos, setsideVideos] = useState([])

    useEffect(() => {

        axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                console.log(response.data.videos)
                setsideVideos(response.data.videos);
            } else {
                alert('못가져옴');
            }
        })

    }, [])

    
    const renderSideVideo = sideVideos.map((video, index) => {

        if(video){

            var minutes = Math.floor(video.duration / 60);
            var seconds = Math.floor((video.duration - minutes * 60));
            var videoThumb = video.thumbnail === undefined ? "" : `http://${window.location.hostname}:5000/${video.thumbnail}`;
            
            return (
                <div key={index} style={{ display:'flex', marginBottom:'1rem', padding: '0 2rem'}}>
                    <div style={{ width: '40%', marginRight:'1rem'}}>
                        <a>
                            <img style={{ width:'100%', height:'100%', objectFit:'cover'}} src={videoThumb} alt='thumbnail' />
                        </a>
                    </div>

                    <div style={{ width: '50%'}}>
                        <a style={{color:'grey'}}>
                            <span style={{ fontSize: '1rem', color:'black'}}>{video.title}</span><br />
                            <span>{video.writer.name}</span><br />
                            <span>{video.views} views</span><br />
                            <span>{minutes} : {seconds}</span><br />
                        </a>
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div>로딩중</div>
            )
        }
       
    })


    return (

        <React.Fragment>
            <div style={{marginTop:'3rem'}}/>
            {renderSideVideo}
        </React.Fragment>

        
    )
}

export default SideVideo
