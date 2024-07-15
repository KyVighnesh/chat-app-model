import React from 'react'
import Styles from '../Stylesheets/modal.css'
import { modalData } from '../dataSet'
import { useState } from 'react'
import { useContext } from 'react'
import { dataContext } from './Home'

const Modal = () => {

    const{dark,setDark} = useContext(dataContext)

    const[data,setData] = useState(modalData)

    const[darkMode,setDarkMode] = useState(false)


    const onHandleDarkMode = (e) => {
        setDarkMode((prev)=>!prev)

        setDark(!dark)

        e.stopPropagation()
    }
  return (
    <div className='modal-container' style={{backgroundColor:dark?'#292730':'white',color:dark?'white':'black',boxShadow:dark?'4px 4px black':''}}>
        {data.map((data)=> {
            return(
                <div className='options'>
                    <i className={data.icon}></i>
                    <span>{data.text}</span>
                    {data.text == 'Dark Mode'?

                        <div className='dark-toggle' onClick={onHandleDarkMode} style={{border:dark?'2px solid #8E5AFF':'',backgroundColor:dark?'#8E5AFF':""}}>
                            <div className='dark-toggle-traveller' style={{marginLeft:dark?'60%':'',border:dark?'1px solid #8E5AFF':'',backgroundColor:dark?'black':'',height:dark?'21px':"",width:dark?'34px':""}}>
                            </div>
                        </div>
                    :""}
                </div>
            )
        })}
    </div>
  )
}

export default Modal