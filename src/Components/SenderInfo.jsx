import React, { useState } from 'react'
import Styles from '../Stylesheets/senderinfo.css'
import { useContext } from 'react'
import { dataContext } from './Home'

const SenderInfo = (props) => {

    const{selected,dark} = useContext(dataContext)

    const[toggle,setToggle] = useState(false)

    const onHandleClickToggle = () => {
        setToggle((prev)=>!prev)
    }

    const onHandleClose = () => {

        props.close(false)
    }


  return (
    <div id='sender-info-container'>

        <nav className='top-nav-sender' style={{backgroundColor:dark?'#292730':'',color:dark?'white':''}}>
            
            <button className='close-button' onClick={onHandleClose}><i class="fa-solid fa-xmark" style={{color:dark?'white':''}}></i></button>
            <h5>User Info</h5>
            <button className='edit-sender'>
            <i class="fa-solid fa-pencil" id='edit-pencil' style={{color:dark?'white':''}}></i>
            </button>

        </nav>

        <main className='main-info-sender' style={{backgroundColor:dark?'#292730':'',color:dark?'white':''}}>

            <div className='main-sender-name-wrapper'>
                <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt=""/>
                <h4>{selected[0].creator.name}</h4>
                <span>Last Seen at {selected[0].creator.updated_at}</span>
            </div>

            <div className='sender-contact'>

            <i class="fa-solid fa-phone"></i>

                <div className='number'>
                    <span>{selected[0].creator.phone !=null?`+ ${selected[0].creator.country.phone_code} ${selected[0].creator.phone}` :""}</span>
                    <span>Phone</span>
                </div>

            </div>

            
            <div className='sender-contact'>

            <i class="fa-regular fa-bell" id='notification-icon'></i>

                <span className='notification-text'>Notifications</span>

                <div className='toggle-container'>

                <div className='toggle-notification' onClick={onHandleClickToggle} style={{backgroundColor:toggle?'aqua':'grey'}}>
                    <div className='toggle-traveller' style={{marginLeft:toggle?'54%':"",border:toggle?'1px solid blue':'1px solid grey'}}>

                    </div>
                </div>

                </div>

            </div>
        </main>

    </div>
  )
}

export default SenderInfo