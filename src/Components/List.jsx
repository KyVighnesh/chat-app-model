import React, { useState } from 'react'
import Styles from '../Stylesheets/list.css'
import ChatList from './ChatList'
import ContactList from './ContactList'
import { useEffect } from 'react'
import { dataContext } from './Home'
import { useContext } from 'react'

const List = () => {

  
  const[windowWidth,setWindowWidth] = useState(window.innerWidth)

  const {selected} = useContext(dataContext)

  const setWindow = () => {
      setWindowWidth(window.innerWidth)
  } 


  useEffect(()=> {

      window.addEventListener('resize',setWindow)

  return ()=>window.removeEventListener('resize',setWindow)
  },[])

  return (
    <div className='main-list-container' style={{display:windowWidth<=665 && selected.length>0?'none':windowWidth<=665 && selected.length==0?'block':'',width:windowWidth<=665 && selected.length<0?'100%':""}}>
        <ChatList/>
    </div>
  )
}

export {List}