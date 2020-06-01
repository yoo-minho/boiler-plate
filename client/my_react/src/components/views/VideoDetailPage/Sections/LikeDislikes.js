import React, {useEffect, useState} from 'react'
import { Tooltip } from 'antd';
import {
    LikeOutlined,
    LikeFilled,
    DislikeOutlined,
    DislikeFilled
} from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}
    if(props.video){
        variable = {videoId : props.videoId, userId: props.userId}
    } else {
        variable = {commentId : props.commentId, userId: props.userId}
    }
    console.log("LikeDislikes variable" + JSON.stringify(variable))

    useEffect(() => {

        Axios.post("/api/like/getLikes", variable)
        .then(response=> {
            if(response.data.success){

                // 얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length);

                // 내가 이미 그 좋아요를 눌렀는지
                response.data.likes.map(like => {
                    if(like.userId === props.userId){
                        setLikeAction('liked');
                    }
                })

            } else {
                alert('음슴');
            }
        })

        Axios.post("/api/like/getDislikes", variable)
        .then(response=> {
            if(response.data.success){

                // 얼마나 많은 싫어요를 받았는지
                setDislikes(response.data.dislikes.length);

                // 내가 이미 그 싫어요를 눌렀는지
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId){
                        setDislikeAction('disliked');
                    }
                })

            } else {
                alert('음슴');
            }
        })

        console.log("Likes : " + Likes + "/" + LikeAction)
        console.log("Dislikes : " + Dislikes + "/" +  DislikeAction)

    }, [])

    const onLike = () => {
        if(LikeAction === null){
            Axios.post('/api/like/upLike', variable)
            .then(response=> {
                if(response.data.success){

                    setLikes(Likes + 1);
                    setLikeAction('liked')

                    if(DislikeAction !== null){
                        setDislikeAction(null);
                        setDislikes(Dislikes -1);
                    } else {
                        //done
                    }
    
                } else {
                    alert('음슴');
                }
            })
        } else {

            Axios.post('/api/like/unLike', variable)
            .then(response=> {
                if(response.data.success){
                    setLikes(Likes - 1);
                    setLikeAction(null)
                } else {
                    alert('음슴');
                }
            })
        }
    }

    const onDislike = () => {
        if(DislikeAction !== null){

            Axios.post('/api/like/unDislike', variable)
            .then(response=> {
                if(response.data.success){
                    setDislikes(Dislikes - 1);
                    setDislikeAction(null)
                } else {
                    alert('음슴');
                }
            })

        } else {

            Axios.post('/api/like/upDislike', variable)
            .then(response=> {
                if(response.data.success){
                    setDislikes(Dislikes + 1);
                    setDislikeAction('disliked')

                    if(LikeAction !== null){
                        setLikeAction(null);
                        setLikes(Likes -1);
                    } else {
                        //done
                    }
                } else {
                    alert('음슴');
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like" onClick={onLike}>
                    {LikeAction === 'liked' ? <LikeFilled/> : <LikeOutlined/>}
                </Tooltip>
                <span style={{paddingLeft:'8px',cursor:'auto'}}> {Likes} </span>
            </span>
            &nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike" onClick={onDislike}>
                    {DislikeAction === 'disliked' ? <DislikeFilled/> : <DislikeOutlined/>}
                </Tooltip>
                <span style={{paddingLeft:'8px',cursor:'auto'}}> {Dislikes} </span>
            </span>
            &nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
