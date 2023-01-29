import React, { useState, useEffect } from "react";
import "../App.css";
import "../components/scss/home.scss";
import "../components/scss/input.scss";
function Input({
  setStartGame,
  selectedImages,
  finish,
  setFinish,
  setTimeCounter,
  time,
  setTime,
  setSelectedImages
}) {
  const [board, setBoard] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [result, setResult] = useState([]);
  //  console.log(selectedImages.length / 2);
 useEffect(()=> {
  if(finish === true){
    setTimeCounter(false);
  }
  else{
    setTimeCounter(true)
  }

 }, [finish])
  function rows(x) {
    if (x < 3) {
      return { width: "620px", column: "50% 50%" };
    } else if (x > 2 && x < 5) {
      return { width: "900px", column: "33% 33% 33%" };
    } else if (x > 4 && x < 7) {
      return { width: "1100px", column: "25% 25% 25% 25%" };
    } else if (x > 6 && x < 11) {
      return { width: "1300px", column: "20% 20% 20% 20%" };
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(result);
    //najpierw wylaczam button, pozniej sprawdzam czy trafilem, jak tak to nic nie zmieniam, jak nie to odblokowuje dwa ostatnie buttony
    // console.log(e);
    e.target.disabled = true;
    clicked.push([e.target.id, e.target.children[0].id]);
    // console.log(clicked.length%2);
    e.target.children[0].classList.add("card-animation");
    // console.log(clicked.length)
    if (clicked.length > 1) {
      const firstChecked = document.querySelectorAll(
        `button[id='${clicked[clicked.length - 1][0]}']`
      );
      const secondChecked = document.querySelectorAll(
        `button[id='${clicked[clicked.length - 2][0]}']`
      );
      


      if (clicked.length % 2 == 0) {
        if (
          Number.parseInt(clicked[clicked.length - 1][1]) ==
          Number.parseInt(clicked[clicked.length - 2][1])
        ) {
          firstChecked[0].classList.add("checked");
          secondChecked[0].classList.add("checked");
          result.push(clicked[clicked.length - 1][1]);
        
          const checkedResult = document.querySelectorAll(
            `button`
          );
            console.log(checkedResult.length)

          if (
            Number.parseInt(result.length * 2) === Number.parseInt(checkedResult.length)
          ) {
            setFinish(true);
         
          }
       
        }
      } else {
        const thirdCheced = document.querySelectorAll(
          `button[id='${clicked[clicked.length - 3][0]}']`
        );
        if (secondChecked[0].classList.contains("checked") == false) {
          secondChecked[0].disabled = false;
          secondChecked[0].children[0].classList.remove("card-animation");
        }
        if (thirdCheced[0].classList.contains("checked") == false) {
          thirdCheced[0].disabled = false;
          thirdCheced[0].children[0].classList.remove("card-animation");
        }
      }
    }
  };
  for (let x = 0; x < selectedImages.length; x++) {
    board.push(
      React.createElement(
        "button",
        { className: "card-back", key: x, id: x, onClick: handleClick },
        [
          React.createElement("img", {
            className: "card",
            src: require(`../components/img/image-${
              selectedImages[x] > 9 ? selectedImages[x] - 10 : selectedImages[x]
            }.jpg`),
            key: x,
            id:
              selectedImages[x] > 9
                ? selectedImages[x] - 10
                : selectedImages[x],
            onClick: handleClick,
          }),
        ]
      )
    );
  }
function setNewgame(){
  setStartGame(false);
  setBoard([]);
  setClicked([]);
  setResult([]);
  setFinish(false);
  setTime(-3);
  setTimeCounter(false);
  setSelectedImages((
    new Array(10).fill(false)
  ))
  
}
  return (
    <>
      <div
        className="cardContainer"
        style={{
          maxWidth: `${rows(selectedImages.length / 2).width}`,
          gridTemplateColumns: `${rows(selectedImages.length / 2).column}`,
        }}
      >
        {board}
        <>{finish == true && 
        <div className="finishDiv">
        <h2> Time: {Math.floor(time / 60)} :{" "}
                {time - Math.floor(time / 60) * 60}</h2>

           <label className="toogle-1" onClick={setNewgame} >
                <input
                  type="checkbox"
                  id="toggle1"
                  className="toogle-1_input"
                />
                <span className="toogle-1_button"></span>
              </label>

       </div>
        }</>
      </div>
      <>
      </>
    </>
  );
}

export default Input;