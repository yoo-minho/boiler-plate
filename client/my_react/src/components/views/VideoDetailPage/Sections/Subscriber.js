import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Subscriber(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {

        let varibale = { userTo : props.userTo}

        axios.post('/api/subscribe/subscribeNumber', varibale)
        .then(response => {
            if(response.data.success){
                console.log(response.data.subscribeNumber)
                setSubscribeNumber(response.data.subscribeNumber);
            } else {
                alert('구독자 못가져옴')
            }
        })

        let subVaribale = { userTo : props.userTo, userFrom: localStorage.getItem('userId')}

        axios.post('/api/subscribe/subscribed', subVaribale)
        .then(response => {
            if(response.data.success){
                setSubscribed(response.data.subscribed);
            } else {
                alert('정보를 받아오지 못함')
            }
        })

    }, [])

    const onSubscribe = () => {

        let unSubscribeVariable = {userTo : props.userTo, userFrom: localStorage.getItem('userId')}
        console.log(unSubscribeVariable)

        if(Subscribed){

            axios.post('/api/subscribe/unSubscribe', unSubscribeVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소하는데 실패함')
                }
            })

        } else {

            axios.post('/api/subscribe/subscribe', unSubscribeVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소하는데 실패함')
                }
            })

        }

    }


    return (
        <div>
            <button
                style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius:'4px', color:'white', padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'}}     
                onClick={onSubscribe}       
            >
            {SubscribeNumber} {Subscribed ? '구독중' : '구독하기'}
            </button>
        </div>
    )
}

export default Subscriber
