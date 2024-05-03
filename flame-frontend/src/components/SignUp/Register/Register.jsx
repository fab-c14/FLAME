import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Register.css';

const Registration = () => {
    const [userType, setUserType] = useState('student');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };
    const handlePassword = (event) =>{

    }
    const handleEmail = (event) =>{

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
      <section className='secant  ma3 pa2 py-3 b br4 b--white'>
            <li class="list-group-item bg-transparent border-bottom py-3 px-0">
        <div class="row align-items-center">
            <div class="col-auto">
                <a href="#" class="user-avatar rounded bordered">
                    <img class="p-1 rounded" alt="Image placeholder" src="./assets/img/team/profile-picture-1.jpg" />
                </a>
            </div>
            <div class="col-auto px-0">
                <h4 class="fs-6 mb-0">
                    Chris Wood
                </h4>
                <span class="small text-muted">Graphic Designer</span>
            </div>
            <div class="col text-end">
                <span class="fs-6 fw-bolder">$1,834</span>
            </div>
        </div>
    </li>
      </section>
    );
};

export default Registration;
