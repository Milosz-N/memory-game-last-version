import React, { useState, useEffect, useRef, useCallback } from "react";
import Input from "./Input";
import "../components/scss/fonts.scss";
function Home() {
  // var x = 0;
  const [startGame, setStartGame] = useState(false);
  const [finish, setFinish] = useState(false);
  const [timeCounter, setTimeCounter] = useState(false);
  const [time, setTime] = useState(-3);
  const intervalIDRef = useRef(null);

  
  useEffect(() => {
    // console.log(timeCounter)
    if(timeCounter == true){
      startTimer();
    }
    else{
      stopTimer();
    }
  }, [timeCounter]);
 useEffect(() => {
  document.body.style.backgroundImage =
      "linear-gradient(90deg, #A6DAF5 36%, #CCF998 100%)";
    return () => clearInterval(intervalIDRef.current); // to clean up on unmount
}, []);

  const startTimer = useCallback(() => {
    intervalIDRef.current = setInterval(() => {
        setTime(prev => prev + 1);
    }, 1000);
}, []);

const stopTimer = useCallback(() => {
    clearInterval(intervalIDRef.current);
    intervalIDRef.current = null;
}, []);
  const images = importAll(
    require.context("../components/img", false, /\.(|jpe?g|)$/)
  );
  const [selectedImages, setSelectedImages] = useState(
    new Array(images.length).fill(false)
  );

  function importAll(r) {
    return r.keys().map(r);
  }
  function isChecked(array) {
    var map = array.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
    var x = map.true > 1;
    return x;
  }

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = selectedImages.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedImages(updatedCheckedState);
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    let arr = shuffle(
      selectedImages.concat(selectedImages).flatMap((b, i) => (b ? i : []))
    );
    setSelectedImages(arr);
    //tutaj podwoic tablice, zrobic flat jak w 63 i wymieszac, taka przekazac na Input
    setStartGame(true);
    setTimeCounter(true);
  };
  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }

  return (
    <>
      {startGame == false && (
        <>
          <h2>Choose at least two images</h2>
          <div className="inputContainer">
            {images.map((index, x) => (
              <div
                className={`${
                  selectedImages[x] === true ? "inputImage bold" : "inputImage"
                }`}
                key={x}
                style={{
                  backgroundImage: `url(${require(`../components/img/image-${x}.jpg`)})`,
                }}
                onClick={() => {
                  handleCheckboxChange(x);
                }} //tu byl x++
              ></div>
            ))}
          </div>
          <>
            {isChecked(selectedImages) ? (
              <label className="toogle-1" onClick={handleStartGame}>
                <input
                  type="checkbox"
                  id="toggle1"
                  className="toogle-1_input"
                />
                <span className="toogle-1_button"></span>
              </label>
            ) : (
              <label className="toogle-2">
                <input
                  type="checkbox"
                  id="toggle2"
                  className="toogle-2_input"
                />
                <span className="toogle-2_button"></span>
              </label>
            )}
          </>
        </>
      )}
      <>
{startGame == true && <>
  {time >= 0 == true ? (
          <>
            {" "}
            <Input
              startGame={startGame}
              setStartGame={setStartGame}
              selectedImages={shuffle(selectedImages)}
              finish={finish}
              setFinish={setFinish}
              timeCounter={timeCounter}
              setTimeCounter={setTimeCounter}
              time={time}
            
            />
          
            
          </>
        )
      :<>
      <h1>{Math.abs(time)}</h1>
      </>
      }
</>} 
{(startGame == true && finish == false && time > 0) && <>  <h2>
            Czas gry {Math.floor(time / 60)} :{" "}
                {time - Math.floor(time / 60) * 60}
            </h2></> }
      </>
    </>
  );
}

export default Home;