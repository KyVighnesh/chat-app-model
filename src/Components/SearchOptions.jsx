import React from 'react'
import { useState } from 'react'
import Styles from '../Stylesheets/searchoptions.css'
import { useContext } from 'react'
import { dataContext } from './Home'

const SearchOptions = () => {
    const[data,setData] = useState(['Chats','Media','Links','Files','Music','Voice'])

    const[index,setIndex] = useState(0)

    const {dark} = useContext(dataContext)


    const onHandleSelectOption = (i) => {

        setTimeout(()=> {
            setIndex(i)
        },1)

    }
  return ( 
    <div className='search-option-container'>
        <nav className='search-nav-head' style={{backgroundColor:dark?'#292730':'',color:dark?'white':''}}>

            {data.map((option,i)=> {
                return(
                    <div onClick={()=>onHandleSelectOption(i)} className='option-text'>
                        <span>
                            {option}
                        </span>

                        <div style={{height:'4px',marginLeft:'20%',backgroundColor:'blue',width:'2px',overflow:'visible',width:i==index?'60%':'0%',transition:'width 0.5s ease'}}></div>

                    </div>
                )
            })}

        </nav>

        <div className='info-container' style={{backgroundColor:dark?'#292730':'',color:dark?'white':''}}>
            {data[index]} Empty
        </div>
    </div>
  )
}

export default SearchOptions