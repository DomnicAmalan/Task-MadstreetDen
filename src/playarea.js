import React, { useContext } from 'react';
import './App.css';
import {Handlers} from './App'
import DropElement from './drop_element.js'

function PlayArea() {

const {dropped} = useContext(Handlers);

let elements = []
let index = 0;

    dropped.forEach(ele =>{
    elements.push(
        <DropElement styles={ele.style} name={ele.id} index={index} tag={ele.tag} config={ele.showConfig} nameProperty={ele.nameProperty} />)
        index += 1
    });

return (
    <div>
        <header >
            playArea
        </header>
        {elements}
    </div>
);
}

export default PlayArea;