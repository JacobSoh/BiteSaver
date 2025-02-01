'use client'

import React from 'react'
import styles from './forgot.module.css'

const ForgotPassword = (): React.ReactElement => {
  const handleReset = (): void => {
  }

  return (
    <div className="mt-24">
      <form onSubmit={handleReset} className={styles.container}>
        <div className={styles.top}>
          <div className={styles.title}>
          <h1 className="text-primary text-center text-4xl font-bold">Forgot Password</h1>
          </div>
          <span className={styles.desc}>Enter the email address associated with your account, and we&apos;ll send you a link to reset your password.</span>
        </div>

        <div className={styles.formInput}>
          <label htmlFor='email' className={styles.formLabel}>Email</label>
          <input type='email' className={styles.inputBox} name='email' id='email' required />
          <div className={styles.enterContainer}>
            <button className={`btn btn-primary ${styles.enter}`}>Continue</button>
          </div>
        </div>


        <div className={styles.back}>
          <a href="/login" className={styles.link}>Back to login page</a>
        </div>
    </form>
    </div>
  )
}

export default ForgotPassword