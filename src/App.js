import React, { useRef, useState} from "react";
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
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
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
    <main style={{margin: '0', padding: '0', height : "100%", width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{fontFamily: 'monospace', fontSize: '28px', margin: '0px 0px 15px 0px'}}>Example of the Movable Library</h1>
      <p id="paragraph">Hello, you are seeing an example of the use of the <span style={{fontSize: 'bolder !important'}}>Movable</span> library, you can create a movable and stretch component which will have a Random image, you can delete an element touching it and giving in the eliminate button</p>
      <div
        id="parent"
        style={{
          background: "black",
          height: "80vh",
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
      <div style={{display: 'flex', width: '40%', justifyContent: 'space-between'}}>
      <button className="btn-dark" style={{ width: '150px', fontWeight: 'bold', marginTop: '20px', backgroundColor: 'black', color: 'white', borderRadius: '10px', cursor: 'pointer', padding: '9px', fontFamily: 'monospace'}} onClick={all}>Add Moveable</button>
      <button className="btn-ligth" style={{ width: '150px', fontWeight: 'bold', marginTop: '20px', borderRadius: '10px', padding: '9px', fontFamily: 'monospace', color: 'black'}} onClick={() => del(objDel)} disabled={disabled}>Eliminar Objeto</button>
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
          display: 'flex',
          marginTop: '11.6vh',
          marginLeft: '10vw',
          position: "absolute",
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
