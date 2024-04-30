import React from "react";
import './flame.css';

export const Flame = () => {
    return (
<svg fill="#c24324" width="100%" height="100%" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7F00"></stop>
            <stop offset="50%" stopColor="#FF0000"></stop>
            <stop offset="100%" stopColor="#FF7F00"></stop>
        </linearGradient>
    </defs>
    

    <path d="M16 1c-3.282 15.79-13.125 17.366 0 28.418c13.126-11.053 3.282-12.628 0-28.418z" fill="url(#flameGradient)" stroke="#FF7F00" strokeWidth="0.5" className="svg-elem-1"></path>
    
    
    <path d="M7.797 10.463c-1.641 4.736-4.922 7.919-4.922 12.656s6.562 7.881 11.485 7.881c-9.844-7.896-6.563-12.643-6.563-20.537z" fill="url(#flameGradient)" stroke="#FF7F00" strokeWidth="0.5" className="svg-elem-2"></path>
    
   
    <path d="M24.203 10.463c0 7.895 3.282 12.642-6.562 20.537 4.922 0 11.485-3.144 11.485-7.881s-3.282-7.92-4.922-12.656z" fill="url(#flameGradient)" stroke="#FF7F00" strokeWidth="0.5" className="svg-elem-3"></path>
    
 
   
</svg>

    );
}
