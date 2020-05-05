import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function LangingPage(props) {

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

    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width : '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LangingPage)
