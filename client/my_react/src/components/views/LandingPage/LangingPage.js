import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Card, Avatar, Col, Row} from 'antd'
import NavBar from '../NavBar/NavBar'

const { Meta } = Card;

function LangingPage(props) {

    const [Video, setVideo] = useState([]);

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push('/login')
            } else {
                alert('로그아웃하는데 실패했습니다.');
            }
        })
    }

    useEffect(() => {

        axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                console.log(response.data.videos)
                setVideo(response.data.videos);
                console.log(Video)
            } else {
                alert('못가져옴');
            }
        })

    }, [])

    console.log("11")
    console.log(Video)

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        var creatDttm = video.createdAt === undefined ? "" : video.createdAt.substr(0,10);

        var videoThumbnail = video.thumbnail === undefined ? "" : `http://localhost:3000/${video.thumbnail}`;

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

            <div style={{
                display:'flex', justifyContent:'center', alignItems:'center'
                , width : '100%', height: '100vh'
            }}>
                <h2>시작 페이지</h2>

                <button onClick={onClickHandler}>
                    로그아웃
                </button>
            </div>
        </div>
        }></NavBar>
    )
}

export default withRouter(LangingPage)
