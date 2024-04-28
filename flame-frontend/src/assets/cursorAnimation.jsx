import React from 'react'
import "./cursorAnimation.css"; 

const cursorAnimation = () => {
    const coords = {x:0,y:0};
    const circles = document.querySelectorAll(".circle");
    circles.forEach((circle)=>{
        circle.x = 0;
        circle.y = 0;
    })
    window.addEventListener("mouseover",(e)=>{
        coords.x = e.clientX;
        coords.y = e.clientY;
        console.log(coords);
        animatedCircles();
    });
    animatedCircles = ()=>{
         let x = coords.x;
         let y = coords.y;
        circles.forEach((circle,index)=>{
            circle.style.left = coords.x - 12  + "px";
            circle.style.top = coords.y -12  + "px";
            circle.x = x;
            circle.y = y;
        }) 
    };
  return (
    <div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
    </div>
  )
}

export default cursorAnimation  