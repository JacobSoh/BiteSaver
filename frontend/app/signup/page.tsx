'use client'

import React, { useState } from 'react'
import styles from './signUpForm.module.css'

const SignUpForm = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const [showcPassword, setShowcPassword] = useState(false)

  const handleSignUp = async (formData: FormData): Promise<void> => {
    console.log(formData)
  }

  return (
    <div className={styles.main}>
      <form className={styles.container} action={handleSignUp}>
        <div className={styles.title}>
            <h2 className="text-primary text-center text-4xl font-bold mb-6">Join Us!</h2>
        </div>
        <div className={styles.form}>
            <div className={styles.formInput}>
              <label htmlFor='firstname' className={styles.formLabel}>First Name</label>
              <input type='text' className={styles.inputBox} name='firstname' id='firstname' required />
            </div>
            <div className={styles.formInput}>
              <label htmlFor='lastname' className={styles.formLabel}>Last Name</label>
              <input type='text' className={styles.inputBox} name='lastname' id='lastname' required/>
            </div>
          <div className={styles.formInput}>
            <label htmlFor='username' className={styles.formLabel}>Username</label>
            <input type='text' className={styles.inputBox} name='username' id='username' required/>
          </div>

          <div className={styles.formInput}>
            <label htmlFor='email' className={styles.formLabel}>Email</label>
            <input type='email' className={styles.inputBox} name='email' id='email' required/>
          </div>

          <div className={styles.formInput}>
            <label htmlFor='password' className={styles.formLabel}>Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.inputBox}
                name='password'
                id='password'
                required
                />
              <button type='button' className={styles.showPasswordButton} onClick={() => { setShowPassword(!showPassword) }}>
              {!showPassword
                ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.passwordsvg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                  )
                : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.passwordsvg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  )}
              </button>
            </div>
          </div>

          <div className={styles.formInput}>
            <label htmlFor='cpassword' className={styles.formLabel}>Confirm Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showcPassword ? 'text' : 'password'}
                className={styles.inputBox}
                name='cpassword'
                id='cpassword'
                required
                />
              <button className={styles.showPasswordButton} onClick={() => { setShowcPassword(!showcPassword) }}>
              {!showcPassword
                ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.passwordsvg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                  )
                : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.passwordsvg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  )}
              </button>
            </div>
          </div>

          <div className={styles.termsContainer}>
            <input id="terms" className={styles.terms} type="checkbox" required />
            <label htmlFor='terms'>I agree to the <a href="#" className={styles.terms}>terms and conditions</a></label>
          </div>
        </div>
        <div className={styles.enterContainer}>
            <button className={`btn btn-primary ${styles.enter}`}>Sign Up</button>
        </div>

        <div className = "text-center" style={{ paddingLeft: '5px', paddingRight: '5px', paddingBottom: '50px' }}>
          If you already have an account, sign in <a className="text-primary" href = "/login">here</a>.
        </div>

      </form>
    </div>
  )
}

export default SignUpForm
