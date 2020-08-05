import React, { useState, useContext } from 'react';
import './App.css';
import {Handlers} from './App'
import { Input, TextArea, Button } from './DraggableUiComponents'


function DropElement(props) {
    const [localStyle, setLocalStyle] = useState(JSON.stringify(props.styles))
    const [error, setError] = useState(null)
    const {onDragStartDrop,handleConfig, setDropped, dropped} = useContext(Handlers)

    

    const onSubmit = (event) => {
        let temp = [...dropped]


        let style = IsJsonString(localStyle)
        if (style){
            temp[props.index]['style'] = style
            temp[props.index]["showConfig"] = false
            setDropped(temp)
        }
        else{
            setError("Invalid Style property")
            setTimeout(() => {
                setError(null)
            }, 3000) 
        }    
    }

    const handleChange = (event) => {
        setLocalStyle(event.target.value)
    }


    function IsJsonString(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    }

    const ComponentSelector = () => {
        switch (props.name)
        {
            case "Input" : return <Input styles={props.styles} name={props.name} id={props.index}/>
            case "Text" : return <TextArea styles={props.styles} name={props.name} id={props.index}/>
            case "Button" : return <Button styles={props.styles} name={props.name} id={props.index}/>
            default : return <h3>{props.name}</h3>
        }
    }

    return (
        <>
            <div draggable onDragStart={(e)=>onDragStartDrop(e,props.name,props.index)} onClick={(e)=>handleConfig(e, props.index)} >
                   
                        {ComponentSelector()}
            </div>
            <div className="config-container">
                {props.config ? 
                    <>
                        <div>{error ? error : null}</div>
                        <input className="config-input" type='textarea' value={localStyle} onChange={(e) => handleChange(e)}/>
                        <button  onClick={() => onSubmit()}>Save</button>
                    </>
                    : null
                }
            </div>
        </>
    )
}

export default DropElement;