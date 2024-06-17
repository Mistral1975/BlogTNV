"use client"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import styles from "../login.module.css";
export const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState('Please insert email and password');
    const [isValid, setIsValid] = useState(null);
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: ''
    });
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValidationErrors(prevValue => ({
            ...prevValue,
            [name]: ''
        }));
        setInput(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    useEffect(() => {
        if (isValid) {
            setMessage('Registering...');
            fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: input.email,
                    password: input.password
                })
            }).then(async res => {
                if (res.ok) {
                    dispatch(register(await res.json()));
                    setMessage('Registration successful!');
                    setShowForm(false);
                } else {
                    const errorData = await res.json();
                    setMessage(errorData.message || 'Registration failed');
                }
            }).catch(() => {
                setMessage("Error");
            });
        }
    }, [isValid]);

    const handleSubmit = () => {
        let valid = true;
        if (input.email === '') {
            setValidationErrors(prevValue => ({
                ...prevValue,
                email: 'Email cannot be empty'
            }));
            valid = false;
        }
        if (input.password === '') {
            setValidationErrors(prevValue => ({
                ...prevValue,
                password: 'Password cannot be empty'
            }));
            valid = false;
        }
        setIsValid(valid);
    };

    return (
        <div className={styles.container}>
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className={styles.loginButton}
                >
                    Login
                </button>
            )}
            {showForm && (
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Insert your email and password</h2>
                    <form className={styles.form}>
                        <div className={styles.message}> {message} </div>
                        <div>
                            <input
                                className={styles.input}
                                id="email"
                                type="text"
                                name="email"
                                value={input.email}
                                onChange={(e) => handleChange(e)}
                                placeholder="Email"
                            />
                            {validationErrors.email && <p className={styles.error}>{validationErrors.email}</p>}
                        </div>
                        <div>
                            <input
                                className={styles.input}
                                id="password"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={(e) => handleChange(e)}
                                placeholder="Password"
                            />
                            {validationErrors.password && <p className={styles.error}>{validationErrors.password}</p>}
                        </div>
                    </form>
                    <div className={styles.buttonGroup}>
                        <button
                            onClick={() => handleSubmit()}
                            className={styles.submitButton}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;
