import React, { useState, useEffect } from "react";
import "../components/scss/elements.scss"
function Elements({
images, result
}) {
const img = document.querySelectorAll('.imgLegend')
console.log(result);
console.log(result.includes(("4")))
console.log(images);
  return (
    <div className="containerElements">
   {images.map((item,i) => <img className={result.includes(`${Number.parseInt(i)}`)  ? "imgLegend greenBorder" : "imgLegend redBorder"}

   src={require(`../components/img/image-${i}.jpg`)
} 
   />)}
    </div>
  );
  
}
export default Elements;