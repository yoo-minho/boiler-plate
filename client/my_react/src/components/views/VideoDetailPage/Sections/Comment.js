import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {

    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content : commentValue,
            writer : user.userData._id,
            postId : props.postId,
        }
        
        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                setcommentValue("");
                props.refreshFuncion(response.data.result)
            } else {
                alert('no save!!!');
            }
        })

    }

    return (
        <div>
            <br />
            <p> 댓글 </p>
            <hr />

            {/*Root Comment form*/}

            <form style = {{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style ={{width:'100%', borderRadius:'5px'}}
                    onChange ={handleClick}
                    value ={commentValue}
                    placeholder="write comment"
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>

            {/*Comment Lists*/}

            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment key={index} >
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
                    </React.Fragment>               
                )
            ))}
            
        </div>
    )
}

export default Comment
