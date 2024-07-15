import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import { dataContext } from './Home'
import Styles from '../Stylesheets/chatopen.css'
import SenderInfo from '../Components/SenderInfo'
import axios from 'axios'

const ChatOpen = () => {

    const{selected,setSelected,dark,clear,setClear} = useContext(dataContext)

    const[showSender,setShowSender] = useState(false)

    const[chats,setChats] = useState([])
    const[windowWidth,setWindowWidth] = useState(window.innerWidth)



    const setWindow = () => {
      setWindowWidth(window.innerWidth)
  } 


  useEffect(()=> {

      window.addEventListener('resize',setWindow)

  return ()=>window.removeEventListener('resize',setWindow)
  },[])


    useEffect(()=> {

      if(selected.length>0) {
        axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${selected[0].id}`).then((chat)=> {
          setChats(chat.data.data)
        })
      }

    
    },[selected])



    const closeSender = (value) => {

      setShowSender(value)
    }


    useEffect(()=> {

       console.log(selected)

        
    },[selected])


    const stopPropagation = (e) => {

      e.stopPropagation()
    }


    const onHandleShowSender = () => {

      setShowSender(true)
    }

    const closeOpenChat = (e) => {
      e.stopPropagation()
      setSelected([])
      setClear(!clear)
    }



  return (
    <div id='open-chat' style={{backgroundImage:dark?'url(https://i.pinimg.com/736x/9f/16/7e/9f167e53b88ca63c3b7dca384fb4866b.jpg)':''}}>


        {selected.length>0?<div className='chat-parent'>
          
          <div className='main-chat-info-container' style={{width:showSender && windowWidth >=1080?'70%':showSender && windowWidth <=1080?'100%':'100%'}}>

          <nav className='open-chat-nav' onClick={onHandleShowSender} style={{backgroundColor:dark?'#292730':'',color:dark?'white':'',boxShadow:dark?'3px 3px 3px 3px black':''}}>

<div className='nav-left-open'>

<i class="fa-solid fa-arrow-left" id='close-open-chat' onClick={closeOpenChat} style={{color:dark?'white':''}}></i>

    <div className='chat-icon'>
    <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="" style={{width:'80%'}}/>

    </div>

    <div className='user-info'>
        <span>{selected[0].creator.name}</span>
        <span>Last Seen at {selected[0].creator.updated_at}</span>
    </div>

</div>

<div className='nav-right-open' onClick={stopPropagation}>
<i class="fa-solid fa-phone" onClick={stopPropagation}></i>
<i class="fa-solid fa-magnifying-glass" onClick={stopPropagation}></i>
<i class="fa-solid fa-ellipsis-vertical" onClick={stopPropagation}></i>
</div>

</nav>

<div className='chat-messages'>
  {chats.map((chat)=> {
    return(
      <div className='chat-bubble' style={{marginLeft:chat.sender_id != selected[0].creator.id?'56%':"0px",backgroundColor:dark?'#8E5AFF':'',color:dark?'white':'',boxShadow:dark?' 4px 4px black':''}}>
        <span>{chat.message}
        
</span>

      </div>
    )
  })}
</div>

<div className='bottom-chat'>

<div className='sent-bar'>
  <div className='emoji'>
  <i class="fa-regular fa-face-smile"></i>
  </div>

  <div className='message-input-container'>
  <input type="text" className='message-input' placeholder='Message' />
  </div>
</div>

<input type="checkbox" id="checkbox"/>
<label class="switch" for="checkbox">
  <div class="mic-on">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16"> <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"></path> <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path> </svg>
  </div>
  <div class="mic-off">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-mic-mute-fill" viewBox="0 0 16 16"> <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"></path> <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"></path> </svg>
  </div>
</label>
</div>
</div>

{showSender?<SenderInfo close = {closeSender}/>
:""}
</div>

:""}


    </div>
  )
}

export default ChatOpen