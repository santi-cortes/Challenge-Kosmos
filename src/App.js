import React, { useEffect, useRef, useState} from "react";
import '../src/styles.css'
import Moveable from "react-moveable";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [images, setImages] = useState();
  
  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];
    
    // Get background images
    
    
  setMoveableComponents([
    ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true,
        background: images,
      },
    ]);
  };

  const [theme, setTheme] = useState('dark');

  function handleChange (e) {
    let main = document.body.setAttribute('data-theme', theme);
    setTheme(e.target.checked ? 'light' : 'dark')
  }

  
  
  const img = async function () {
    let api = `https://jsonplaceholder.typicode.com/photos`
    let data = await fetch(api).then((res) => res.json());
    setImages(data[Math.floor(Math.random() * data.length)].url);
  }
  

    
  const updateMoveable = (id, newComponent, updateEnd = false) => {


    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id == id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  const all = async () => {
    await img();
    await addMoveable();
  }

  const [disabled, setDisabled] = useState(true);
  const [objDel, setObjDel] = useState();
  
  

  function obj(idO) {
    setObjDel(idO);
    setDisabled(false);
  }

  function del(idO) {
    const deleteMoveable = moveableComponents.filter((e) => e.id !== idO);
    setMoveableComponents(deleteMoveable);
    setDisabled(true);
  }

  return (
    <main className="main" style={{margin: '0', padding: '0', height : "98vh", width: "96vw", display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
      <div className="container-switch">
      <span className="tag-contain">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M124 40v-8a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0Zm64 88a60 60 0 1 1-60-60a60.07 60.07 0 0 1 60 60Zm-8 0a52 52 0 1 0-52 52a52.06 52.06 0 0 0 52-52ZM61.17 66.83a4 4 0 0 0 5.66-5.66l-8-8a4 4 0 0 0-5.66 5.66Zm0 122.34l-8 8a4 4 0 0 0 5.66 5.66l8-8a4 4 0 0 0-5.66-5.66Zm136-136l-8 8a4 4 0 0 0 5.66 5.66l8-8a4 4 0 1 0-5.66-5.66Zm-2.34 136a4 4 0 0 0-5.66 5.66l8 8a4 4 0 0 0 5.66-5.66ZM40 124h-8a4 4 0 0 0 0 8h8a4 4 0 0 0 0-8Zm88 88a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0v-8a4 4 0 0 0-4-4Zm96-88h-8a4 4 0 0 0 0 8h8a4 4 0 0 0 0-8Z"/></svg></span>
        <label className="switch" >
          <input type="checkbox" onChange={handleChange}/>
          <span className="slider"></span>
        </label>

        <span className="tag-contain">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z"/></svg></span>
      </div>
      <h1 className="title">Example of the Movable Library</h1>
      <p id="paragraph">Hello, you are seeing an example of the use of the <span style={{fontWeight: 'bolder !important'}}>Movable</span> library, you can create a movable and stretch component which will have a Random image, you can delete an element touching it and giving in the eliminate button</p>
      <div
        id="parent"
        style={{
          height: "75vh",
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: "80vw",
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component
          {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            moveableComponents={moveableComponents}
            obj={obj}
          >
          </Component>
          ))}
      </div>
      <div className="buttons" style={{display: 'flex', width: '40vw', minWidth: '450px', justifyContent: 'space-between', marginTop: '-15px'}}>
        <button className="btn-dark" style={{ width: '150px', fontWeight: 'bold', marginTop: '20px', borderRadius: '10px', cursor: 'pointer', padding: '9px', fontFamily: 'monospace'}} onClick={all}>Add Moveable</button>
        <button className="btn-ligth" style={{ width: '150px', fontWeight: 'bold', marginTop: '20px', borderRadius: '10px', padding: '9px', fontFamily: 'monospace'}} onClick={() => del(objDel)} disabled={disabled}>Delete Moveable</button>
      </div>
    </main>
  );
};

export default App;

const Component = ({
  updateMoveable,
  top,
  left,
  width,
  height,
  index,
  color,
  background,
  id,
  setSelected,
  isSelected = false,
  moveableComponents,
  obj,
  updateEnd,
}) => {
  const ref = useRef();

  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    width,
    height,
    index,
    color,
    background,
    id,
  });

  let parent = document.getElementById("parent");
  let parentBounds = parent?.getBoundingClientRect();
  
  const onResize = async (e) => {
    // ACTUALIZAR ALTO Y ANCHO
    let newWidth = e.width;
    let newHeight = e.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
      color,
      background
    });

    // ACTUALIZAR NODO REFERENCIA
    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
      translateX,
      translateY,
      top: top + translateY < 0 ? 0 : top + translateY,
      left: left + translateX < 0 ? 0 : left + translateX,
    });
  };

  const onResizeEnd = async (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;
    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    const { lastEvent } = e;
    const { drag } = lastEvent;
    const { beforeTranslate } = drag;

    const absoluteTop = top;
    const absoluteLeft = left;
    updateMoveable(
      id,
      {
        top: absoluteTop,
        left: absoluteLeft,
        width: newWidth,
        height: newHeight,
        color,
        background
      },
      true
    );
  };

  const deleteObj = () => {
    obj(id);
  }

  return (
    <>
      <div
        ref={ref}
        className="dragg"
        id={"component-" + id}
        style={{
          position: 'relative',
          top: top,
          left: left,
          width: width,
          height: height,
          background: color,
          cursor: 'pointer',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url("${background}")`,
        }}
        onClick={() => {setSelected(id); deleteObj()}}
      />


      <Moveable
        className="frame"
        target={isSelected && ref.current}
        resizable
        draggable
        onDrag={(e) => {
          updateMoveable(id, {
            top: e.top,
            left: e.left,
            width,
            height,
            color,
            background
          });
        }}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        keepRatio={false}
        throttleResize={1}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={false}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};
