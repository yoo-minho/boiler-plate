import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        
        let commentNumber = 0;

        props.commentList.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber ++
            } else {
                //done
            }

            setChildCommentNumber(commentNumber);
        })

    }, [props.commentList])

    const renderReplyComment = (parentCommentId) => {
        return props.commentList.map((comment, index) => (
            <React.Fragment key={index}>
                {(comment.responseTo === parentCommentId) && 
                <div style={{ width:'80%',marginLeft:'40px'}}>
                    <SingleComment 
                        postId={props.postId} 
                        comment={comment}
                        refreshFuncion={props.refreshFuncion}    
                    />
                    <ReplyComment 
                        commentList={props.commentList}
                        parentCommentId={comment._id}
                        postId={props.postId}
                        refreshFuncion={props.refreshFuncion}   
                    />   
                </div>}   
            </React.Fragment>
        ))
    }

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    }

    return (
        <div>

            {ChildCommentNumber > 0 &&
                <div style={{ width:'80%',marginLeft:'40px'}}> 
                    <p style = {{fontSize:'14PX', margin:0, color:'rgb(6,95,212)' }} onClick={onHandleChange}>
                      답글 {ChildCommentNumber} 개 보기
                    </p>
                </div>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment