import React, { useState, useEffect } from 'react'
import '../ChatPage/chat.css'
import NavBar from '../NavBar/NavBar'
import socketIOClient from 'socket.io-client'

function ChatPage() {

    const [Socket, setSocket] = useState("");
    const [Message, setMessage] = useState("");

    useEffect(() => {

        const chatLogObj = document.getElementById("chatLog");
        const memberSelectObj = document.getElementById("memberSelect");

        const ENDPOINT = "http://127.0.0.1:4001";
        const socket = socketIOClient(ENDPOINT);

        socket.emit('joinLobby', {
            "id":localStorage.getItem('userId'),
            "roomId": "1"
        });

        socket.on('receiveMessage', function(data){
            console.log('receiveMessage ### ' + data );
            data["b_me"] = (data.socketId === socket.id);
            drawChatMessage(data); 
        });

        socket.on('updateUserList', function(data){
            console.log('updateUserList ### ' + data)
            let html = "";
            data.userList.forEach((el) => {
                html += `<div class="memberEl">${el.name}${(el.socketId === socket.id ? ' (me)':'')}</div>`
            });
            memberSelectObj.innerHTML = html

            if(data.leftedId){
                chatLogObj.innerHTML += (`<div class="notice"><strong>${data.leftedId}</strong> lefted the room</div>`)
            } 

            if(data.joinedId){
                chatLogObj.innerHTML += (`<div class="notice"><strong>${data.joinedId}</strong> joined the room</div>`)
            } 
        });

        setSocket(socket);

    }, [])

    const drawChatMessage = (data) => {
        const chatLogObj = document.getElementById("chatLog");
        chatLogObj.innerHTML += 
                data.b_me ?
                `<div class="myMsg">
                    <span class="msg">${data.message}</span>
                </div>` :
                `<div class="anotherMsg">
                    <span class="anotherName">${data.name}</span>
                    <span class="msg">${data.message}</span>
                </div>`
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const activeRoomSelectObj = document.getElementById("roomSelect").getElementsByClassName("active")[0];
        Socket.emit('sendMessage', {
            "roomId":activeRoomSelectObj.dataset.id,
            "message": Message
        });

        setMessage('');
    }

    const onClickRoom = (event) => {
        event.preventDefault();
        const activeRoomSelectObj = document.getElementById("roomSelect").getElementsByClassName("active")[0];

        if(activeRoomSelectObj.dataset.id === event.target.dataset.id) return;
        
        Socket.emit('joinNewRoom', {
            "roomId": event.target.dataset.id
        });
        const elements = event.target.parentNode.querySelectorAll(".roomEl");
        Array.prototype.forEach.call(elements, function(el){
            if(event.target.dataset.id === el.dataset.id){
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }       
        });
        document.getElementById("chatHeader").textContent = event.target.textContent;

        const chatLogObj = document.getElementById("chatLog");
        while(chatLogObj.firstChild)
        chatLogObj.removeChild(chatLogObj.firstChild);
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
                                <div id="roomSelect" onClick={onClickRoom}>
                                    <div className="roomEl active" data-id="1">Everyone</div>
                                    <div className="roomEl" data-id="2">VueJS</div>
                                    <div className="roomEl" data-id="3">ReactJS</div>
                                    <div className="roomEl" data-id="4">AngularJS</div>
                                </div>
                            </div>
                        </div>
                        <div id="chatWrap">
                            <div id="chatHeader">Everyone</div>
                            <div id="chatLog"></div>
                            <form id="chatForm" onSubmit={onSubmitHandler}>
                                <input type="text" placeholder="메시지를 입력하세요" value={Message} onChange={onMessageHandler} />
                                <button type="submit">보내기</button>
                            </form>
                        </div>
                        <div id="memberWrap">
                            <div id="memberList">
                                <div id="memberHeader">사람</div>
                                <div id="memberSelect"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }></NavBar>
    )
}

export default ChatPage
