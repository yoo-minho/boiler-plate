import React, { useState, useEffect } from 'react'
import '../ChatPage/chat.css'
import NavBar from '../NavBar/NavBar'
import socketIOClient from 'socket.io-client'

function ChatPage() {

    const [Socket, setSocket] = useState("");
    const [Message, setMessage] = useState("");

    useEffect(() => {

        const ENDPOINT = "http://127.0.0.1:4001";

        const socket = socketIOClient(ENDPOINT);

        socket.on('receiveMessage', function(data){
            console.log('receiveMessage ### ' + JSON.stringify(data))
            if(localStorage.getItem('userId') === data.registerId){
                drawChatMessage(data.message)
            } else {
                drawChatMessage(data.message, data.registerName)
            } 
        });

        setSocket(socket);

    }, [])

    const drawChatMessage = (msg, rgsrNm) => {
        const chatLogObj = document.getElementById("chatLog");
        chatLogObj.innerHTML += 
                rgsrNm ?
                `<div class="anotherMsg">
                    <span class="anotherName">${rgsrNm}</span>
                    <span class="msg">${msg}</span>
                </div>` :
                `<div class="myMsg">
                    <span class="msg">${msg}</span>
                </div>`
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');

        Socket.emit('sendMessage', {
            "message": Message,
            "registerId" : userId,
            "registerName" : userId
        });

        setMessage('');
    }

    const onMessageHandler = (event) => {
        setMessage(event.currentTarget.value);
    }

    return (
        <NavBar content={
            <div>
                <div id="contentWrap">
                    <div id="contentCover">
                        <div id="roomWrap">
                            <div id="roomList">
                                <div id="roomHeader">채팅 방 목록</div>
                                <div id="roomSelect">
                                    <div className="roomEl active" data-id="1">Everyone</div>
                                    <div className="roomEl" data-id="2">VueJS</div>
                                    <div className="roomEl" data-id="3">ReactJS</div>
                                    <div className="roomEl" data-id="4">AngularJS</div>
                                </div>
                            </div>
                        </div>
                        <div id="chatWrap">
                            <div id="chatHeader">Everyone</div>
                            <div id="chatLog">
                                {/*    
                                <div class="anotherMsg">
                                    <span class="anotherName">Jo</span>
                                    <span class="msg">Hello, Nice to meet you.</span>
                                </div>
                                <div class="myMsg">
                                    <span class="msg">Nice to meet you, too.</span>
                                </div>
                                <div class="myMsg">
                                    <span class="msg">{Response}</span>
                                </div>
                                */}
                            </div>
                            <form id="chatForm" onSubmit={onSubmitHandler}>
                                <input type="text" placeholder="메시지를 입력하세요" value={Message} onChange={onMessageHandler} />
                                <button type="submit">보내기</button>
                            </form>
                        </div>
                        <div id="memberWrap">
                            <div id="memberList">
                                <div id="memberHeader">사람</div>
                                <div id="memberSelect">
                                    <div className="memberEl">test</div>
                                    <div className="memberEl">test</div>
                                    <div className="memberEl">test</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }></NavBar>
    )
}

export default ChatPage
