import React from 'react'
import Styles from '../Stylesheets/list.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import { dataContext } from './Home'
import Modal from './Modal'
import SearchOptions from '../Components/SearchOptions'

const ChatList = () => {

    const[chats,setChats] = useState([])

    const{selected,setSelected,dark,setDark,clear} = useContext(dataContext)

    const[showModal,setShowModal] = useState(false)

    const[showSearch,setShowSearch] = useState(false)

    const[opacity,setOpacity] = useState(0)






    const getChatData = () => {
        axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=2').then((res)=> {
            console.log(res.data.data.data)

           let fetchTime = res.data.data.data.map((chat)=> {
                
                let date = new Date(chat.updated_at);

                let time = date.toISOString().split('T')[1].split('.')[0];

                let updatedTime = time.split(':')[0] + ':' + time.split(':')[1]

                console.log(updatedTime)

                chat.updated_at = updatedTime

                chat.toggle = false;

                return chat;
            })


            setChats(fetchTime)
            
        })
        
    }

    useEffect(()=> {


        console.log(selected.length)
        
        

            setChats(chats.map((chat)=> {
                chat.toggle = false;
                return chat
            }))
        
    },[clear])


    useEffect(()=> {

        getChatData()   // function to fetch the chat data from database
        
    },[])

    useEffect(()=> {
        setShowModal(false)
    },[showSearch])

    const onHandleClickCloseShowSearch = (e) => {
        e.stopPropagation()
        setShowSearch(false)
    }

    const onHandleClickShowSearch = (e) => {
        e.stopPropagation()
        setShowSearch(true)
      }



    const onHandleShowModal = () => {

        setTimeout(()=> {
            setShowModal(prev=> !prev)
            
        },50)



        setTimeout(()=> {
            if(showModal) {
                setOpacity(0)
            }

            else {
                setOpacity(1)
            }
        
        },100)
    }




    const onHandleCurrentChat = (element,index) => {

        let copy = JSON.parse(JSON.stringify(chats[index]))

        let updated = copy.creator.updated_at

        let ISO = updated.toString()


        let time = ISO.split('T')[1].split('.')[0];

        copy.creator.updated_at = time;

        console.log(element)


       setSelected([copy])

        setChats(chats.map((chat,i)=> {
            if(i==index) {
                chat.toggle = true;
            }

            else {
                chat.toggle = false
            }

            return chat;
        }))
    }


  return (
    <div id='chatAndcontact-container'>

        <div className='chat-list-container'>
            <nav className='top-nav-chat-list' style={{backgroundColor:dark?'#292730':"#FFFFFF"}}>

            <div className='svg-div'>

                {!showSearch?<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  width="24"
  height="24"
  color={dark?'white':''}
  onClick={onHandleShowModal}
>
  <rect x="3" y="6" width="18" height="2" fill="currentColor" />
  <rect x="3" y="1/3" width="18" height="2" fill="currentColor" />
  <rect x="3" y="12" width="18" height="2" fill="currentColor"/>
</svg>:<i class="fa-solid fa-arrow-left" onClick={onHandleClickCloseShowSearch} style={{color:dark?'#333333':''}}></i>}
  
            
{showModal?<div style={{opacity:opacity,transition:'opacity 0.5s ease'}}><Modal/></div>:""}
  </div>

                <div className='input-div'>
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder='Search' id='input-search' onClick={onHandleClickShowSearch}/>
                </div>

            </nav>
        </div>

        <div style={{display:!showSearch?'none':'block'}}>
        <SearchOptions/>
        </div>

        <div className='main-chat-list' style={{backgroundColor:dark?'#292730':"#FFFFFF",color:dark?'white':"",display:!showSearch?'block':'none'}}>

            {chats.map((chat,i)=> {
                return(
                    <div className='chat-container' onClick={()=>onHandleCurrentChat(chat,i)} style={{backgroundColor:chat.toggle && dark == false?'#3390ec':chat.toggle && dark?'#8E5AFF':''}}>

                        <div className='chat-icon'>

                            <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="" />
                        </div>

                        <div className='chat-info'>

                            <div className='chat-info-top'>
                                <span className='creator'>{chat.creator.name}</span>
                                <span className='updated-user'>{chat.updated_at}</span>
                            </div>

                        </div>

                    </div>
                )
            })}

        </div>
    </div>
  )
}

export default ChatList