import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import Container from '../../ui/Container';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import '../Login/Login.css';

const Registration = () => {
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUser(name, email, password, userType)).then(() => {
      navigate('/');
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4">
      <Container maxWidth="md">
        <Card variant="glass" className="max-w-md mx-auto overflow-hidden">
          <Card.Body className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Join FLAME</h2>
              <p className="text-white/70">Create your account to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Select
                label="User Type"
                value={userType}
                onChange={handleUserTypeChange}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Select>

              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-200 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="text-center">
                <p className="text-white/70 mb-4">Already have an account?</p>
                <Link to="/login">
                  <Button variant="secondary" className="w-full">
                    Sign In
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

export default Registration;
