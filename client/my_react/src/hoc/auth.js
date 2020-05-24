import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){

    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {                
                //로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option){
                        props.history.push('/login')
                    } else {

                    }

                //로그인한 상태                    
                } else {
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/');
                    } else {
                        //!option만 하면 false, null 둘다 먹힘
                        if(!option && option != null){
                            props.history.push('/');
                        } 

                    }
                    
                }

            })

        }, [dispatch, props.history]);

        return (
            <SpecificComponent></SpecificComponent>
        )
    }
    return AuthenticationCheck
}