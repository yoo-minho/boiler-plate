import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Card, Avatar, Col, Typography, Row} from 'antd'
import NavBar from '../NavBar/NavBar'

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {

    const [Video, setVideo] = useState([]);

    const subscriptionVariables = {
        userFrom : localStorage.getItem("userId")
    }

    useEffect(() => {

        axios.post('/api/video/getSubscriptionVideos', subscriptionVariables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.videos)
                setVideo(response.data.videos);
            } else {
                alert('못가져옴');
            }
        })

    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        var creatDttm = video.createdAt === undefined ? "" : video.createdAt.substr(0,10);

        var videoThumbnail = video.thumbnail === undefined ? "" : `http://${window.location.hostname}:5000/${video.thumbnail}`;

        return <Col lg={6} md={8} xs={24} key={index}>
            
            <div style={{position:'relative'}}>
                <a href={`/video/post/${video._id}`}>
                <img style={{width:'100%'}} src={videoThumbnail} alt="thumnail"></img>
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div>
            
            <br />
            <Meta 
                avatar = {
                    <Avatar src={video.writer.image} />
                }
                title = {video.title}
                description=""
            />
            <span>{video.writer.name}</span><br />
            <span style={{marginLeft:'3rem'}}>{video.views} views</span> - <span>{creatDttm}</span>
            
            
        </Col>
    })

    return (
        <NavBar content={
            <div style = {{ width : '85%', margin: '2vh'}}>
                <Row gutter = {[32, 16]}>
                    {renderCards}
                </Row>
            </div>
        }></NavBar>
    )
}

export default SubscriptionPage
