import React, { useContext } from 'react';
import './App.css';
import {Handlers} from './App'
function Element(props) {

const {onDragStart} = useContext(Handlers)
    return (
            <div className="elements" draggable onDragStart={(e) => onDragStart(e, props.ele)}>
                {props.ele}
            </div>
    );
}

export default Element;