import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import Left from './left.js'
import PlayArea from './playarea.js'

export const Handlers = createContext();
function App(props) {

  const [handlers, setHandlers] = useState(['Input', 'Text', 'Button']);
  const [dropped, setDropped] = useState([])
  const [position, setPosition] = useState('absolute')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("test"))
    if(data){
      setDropped(data)
    }
  }, [])

  const onChange = (event, index) => {
    console.log(event.target.value)
    let temp = [...dropped]
    temp[index]['nameProperty'] = event.target.value
    setDropped(temp)
  }

  const Save = () => {
    localStorage.setItem("test", JSON.stringify(dropped))
  }


  const onDragStart = (event, ele) => {
    event.dataTransfer.setData("id", ele);
  }

  const onDragStartDrop = (event, ele, index) => {
    event.dataTransfer.setData("id", ele);
    event.dataTransfer.setData("index", index);
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const handleConfig = (event, index) => {
    if(event.ctrlKey) {
      let temp = [...dropped]
      temp[index]["showConfig"] = true
      setDropped(temp)
    }
    else if(event.shiftKey){
      let temp = [...dropped]
      temp.splice(index, 1)
      setDropped(temp)
    }
  }

  const onDrop = (event) => {
    event.preventDefault();
    let id = event.dataTransfer.getData("id");
    let index = event.dataTransfer.getData("index");
    let x_cord = event.clientX
    let y_cord = event.clientY
    const Box = document.getElementById("playarea").getBoundingClientRect()

    if (index) {
      if (position !== 'relative') {
        let temp = [...dropped]

        let style = {
          left: x_cord - Box.top,
          top: y_cord - Box.left,
          position: position
        }
        temp[index]['style'] = style

        setDropped(temp)
      }
    }
    else {
      let data = {
        'id': id,
        'style': {
          left: x_cord - Box.top,
          top: y_cord - Box.left,
          position: position
        },
        'showConfig': false,
        'nameProperty': 'Type Something....'
      }
      setDropped(dropped => [...dropped, data])
    }
    localStorage.setItem("test", JSON.stringify(dropped))
  }
  



  return (
    <div>
      <header className="AppHeader">
        GUI
      </header>
      <div>
        <div className='components-list-container'>
          <div style={{backgroundColor: "#282c34"}}>
            <label style={{color: "white"}}>Relative</label>
            <input type="radio" id="relative" checked={position === 'relative'} value="relative" name='position' onClick={() => { setPosition('relative') }} />
            <label style={{color: "white"}}>Absolute</label>
            <input type="radio" id="absolute" checked={position === 'absolute'} value="absolute" name='position' onClick={() => { setPosition('absolute') }} />
          </div>
          <Handlers.Provider value={{ handlers, setHandlers, onDragStart }}>
            <Left />
          </Handlers.Provider>
        </div>
        <div id='playarea' className='playarea-container' onDragOver={(e) => onDragOver(e)} onDrop={(e) => { onDrop(e) }}>
          <button style={{position: "absolute", right:30, bottom: 50, backgroundColor:"teal", width:100, height:40, borderRadius: 20, padding: 10}} onClick={() => Save()}>Save</button>
          <Handlers.Provider value={{ dropped, setDropped, onDragStartDrop, handleConfig, onChange }}>
            <PlayArea />
          </Handlers.Provider>
        </div>
      </div>
    </div >
  );
}

export default App;