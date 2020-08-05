import React, { useContext } from 'react';
import {Handlers} from './App'
import Element from './element'

function Left() {

const {handlers} = useContext(Handlers);

let elements = []

handlers.forEach(ele =>{

elements.push(
    <Element ele={ele} />)
});

return (
    <>
        <header>
            Handlers
        </header>
        {elements}
    </>
);
}

export default Left;