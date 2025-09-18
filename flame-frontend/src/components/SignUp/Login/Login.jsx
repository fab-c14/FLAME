import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import Container from '../../ui/Container';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import './Login.css';
import Toaster from '../../../assets/Toaster';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [userType, setUserType] = useState('student');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const userType = formData.get('userType');

    dispatch(loginUser(email, password, userType)).then(() => {
      if (!error) {
        navigate('/');
      }
    }).catch((error) => {
      console.error('Login failed:', error);
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4">
      <Container maxWidth="md">
        <Card variant="glass" className="max-w-md mx-auto overflow-hidden">
          <Card.Body className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/70">Sign in to your FLAME account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Select
                label="User Type"
                name="userType"
                value={userType}
                onChange={handleUserTypeChange}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Select>

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <div className="text-center">
                <p className="text-white/70 mb-4">Don't have an account?</p>
                <Link to="/register">
                  <Button variant="secondary" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Login;
