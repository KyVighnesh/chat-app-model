import React from 'react'
import Styles from '../Stylesheets/home.css'
import {List} from './List'
import { createContext } from 'react'
import { useState,useEffect } from 'react'
import ChatOpen from './ChatOpen'


let dataContext = createContext()

const Home = () => {
    const[selected,setSelected] = useState([])

    const[dark,setDark] = useState(false)

    const[windowWidth,setWindowWidth] = useState(window.innerWidth)

    const[clear,setClear] = useState(false)

    const setWindow = () => {
      setWindowWidth(window.innerWidth)
  } 


  useEffect(()=> {

      window.addEventListener('resize',setWindow)

  return ()=>window.removeEventListener('resize',setWindow)
  },[])

  return (
    <dataContext.Provider value={{selected,setSelected,dark,setDark,clear,setClear}}>
    <div id='Home'>
        <List/>
        <div style={{display:windowWidth<=665 && selected.length<=0?'none':"",width:windowWidth<=665 && selected.length>=0?'100%':''}} className='chat-parent-container'>
        <ChatOpen/>
        </div>
    </div>
    </dataContext.Provider>
  )
}

export {dataContext,Home}