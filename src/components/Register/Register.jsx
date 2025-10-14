import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosEye } from 'react-icons/io';

const Register = () => {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log('Register click', email, password)

        const length6Pattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

        if (!length6Pattern.test(password)) {
            console.log('password didnot match');
            setError('Password must be six character')
            return;
        }
        else if (!casePattern.test(password)) {
            setError('password must have at least one uppercase and lowercase character')
            return;
        }

        else if (!passwordPattern.test(password)) {
            setError("Password must be at least 6 characters long, include one uppercase, one lowercase, and one special character.");
            return;
        }

        // Reset status: success or error
        setError('');
        setSuccess(false);

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('after creation of a new user', result.user)
                setSuccess(true);
                event.target.reset();
            })
            .catch(error => {
                console.log('Error happend', error)

                // setError(error.message)
                setError('Email already in use')
            })
    }

    const handleTogglePasswordShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword)
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <div className='relative'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        className="input" placeholder="Password" />
                                    <button onClick={handleTogglePasswordShow}
                                        className=" btn-xs absolute top-4 right-5 cursor-pointer">
                                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                        </button>
                                </div>
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>

                            {
                                success && <p className='text-green-500'>Account created successfully.</p>
                            }

                            {
                                error && <p className='text-red-500'>{error}</p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;