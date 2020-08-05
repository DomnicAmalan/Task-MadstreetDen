import React, {  useContext } from 'react';
import {Handlers} from './App'


const Input = (props) => {
    const {onChange, dropped} = useContext(Handlers)
    return(
        <>    
            <input type="text" style={props.styles} value={dropped[props.id]["nameProperty"]} onChange={(e) => onChange(e, props.id)}/>
        </>
    )
}

const TextArea = (props) => {
    const {onChange, dropped} = useContext(Handlers)
    return(
        <>
            <input type="textarea" style={props.styles} value={dropped[props.id]["nameProperty"]} onChange={(e) => onChange(e, props.id)}/>
        </>
    )
}


const Button = (props) => {
    return(
        <>
           <button style={props.styles}>{props.name}</button>   
        </> 
    )
}

export {Input, TextArea, Button}