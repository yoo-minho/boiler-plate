import React, {useEffect, useState} from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import SideVideo from './Sections/SideVideo'
import Subscriber from './Sections/Subscriber'

function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState({})

    useEffect(() => {

        const videoId = props.match.params.videoId;
        const variable = {videoId : videoId}
        
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.videoDetail)
                setVideoDetail(response.data.videoDetail);
            } else {
                alert('음슴')
            }
        })

    }, [])

    if(VideoDetail && VideoDetail.writer){

        var videoFilePath = VideoDetail.filePath === undefined ? "" : `http://${window.location.hostname}:5000/${VideoDetail.filePath}`;
        var videoWriter = VideoDetail.writer;

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscriber userTo={VideoDetail.writer._id} />

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={videoFilePath} controls />
                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={videoWriter.image} />}
                                title={videoWriter.name}
                                description={VideoDetail.description}
                            />
    
                        </List.Item>
                        {/*comments*/}
                    </div>
    
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>로딩중</div>
        )
    }
    
}
    
export default withRouter(VideoDetailPage)