import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../../firebase/firebase.init';

const Login = () => {

    const [error, setError] = useState('')

    const emailRef = useRef();

    const handleLogin = e => {
        e.preventDefault();
        // console.log('login successfull')
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (!result.user.emailVerified) {
                    alert('Please verify your email Address')
                }
            })
            .catch(error => {
                // console.log(error)
                setError(error.message);
            })
    }

    const handleForgetPassword = () => {

        const email = emailRef.current.value;
        console.log("Forget password clicked", email);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email to reset password')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (

        <div className="card bg-base-100 w-full mx-auto mt-10 max-w-sm shrink-0  shadow-2xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold">Login now!</h1>
                <form onSubmit={handleLogin}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input"
                            ref={emailRef}
                            placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        <div onClick={handleForgetPassword}>
                            <a className="link link-hover">Forgot password?
                            </a>
                        </div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>

                {
                    error && <p className='text-red-500'>{error}</p>
                }

                <p>Haven't an account? Please <Link to='/register' className='text-blue-600 underline'>Register Now!</Link> </p>

            </div>
        </div>

    );
};

export default Login;