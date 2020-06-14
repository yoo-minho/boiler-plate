import React, {useEffect, useState} from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import SideVideo from './Sections/SideVideo'
import Subscriber from './Sections/Subscriber'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'
import NavBar from '../NavBar/NavBar'

function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState({})
    const [Comments, setComments] = useState([])

    const videoId = props.match.params.videoId;
    const variable = {videoId : videoId}

    useEffect(() => {

        Axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if(response.data.success){
                setVideoDetail(response.data.videoDetail);
            } else {
                alert('음슴')
            }
        })

        Axios.post('/api/comment/getComments', variable)
        .then(response => {
            if(response.data.success){
                setComments(response.data.result);
            } else {
                alert('음슴')
            }
        })

    }, [])

    console.log("VideoDetail : " + JSON.stringify(VideoDetail).length);
    console.log("Comments : " + JSON.stringify(Comments).length);

    const refreshFuncion = (newComment) => {
        setComments(newComment.concat(Comments));
    }

    if(VideoDetail && VideoDetail.writer && Comments){

        var videoFilePath = VideoDetail.filePath === undefined ? "" : `http://localhost:3000/${VideoDetail.filePath}`;
        var videoWriter = VideoDetail.writer;

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscriber userTo={VideoDetail.writer._id} />

        return (
            <NavBar content={
                <Row gutter={[16, 16]}>
                    <Col lg={18} xs={24}>
                        <div style={{width:'100%', padding:'3rem 4rem'}}>
                            <video style={{width:'100%'}} src={videoFilePath} controls />
                            <List.Item
                                actions={[<LikeDislikes 
                                                video 
                                                userId={localStorage.getItem('userId')}
                                                videoId={props.match.params.videoId} 
                                            />,
                                            subscribeButton]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={videoWriter.image} />}
                                    title={videoWriter.name}
                                    description={VideoDetail.description}
                                />
        
                            </List.Item>
                            
                            <Comment postId={videoId} commentList={Comments} refreshFuncion ={refreshFuncion} />
                        </div>
        
                    </Col>
                    <Col lg={6} xs={24}>
                        <SideVideo />
                    </Col>
                </Row>
            }></NavBar>
        )
    } else {
        return (
            <NavBar content={
                <div>로딩중</div>
            }></NavBar>
        )
    }
    
}
    
export default withRouter(VideoDetailPage)