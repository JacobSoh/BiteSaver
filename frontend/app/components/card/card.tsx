'use client';

import styles from './card.module.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import FormMessage from '../formMessage/formMessage';

type CardProps = {
  data: {
    id: number
    img: string
    name: string
    location: string
    portions: number
    timeCreated: Date
    timeLeft: number // Time left in minutes
    tags: string[]
    userId: string | null
  }[];
};

const calculateTime = (timeCreated: Date, timeLeft: number): string => {
  const currentTime = new Date()
  const elapsedTime = Math.floor((currentTime.getTime() - timeCreated.getTime()) / 1000)
  const remainingSeconds = Math.max(0, timeLeft * 60 - elapsedTime)

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
};

const Card = ({ data }: CardProps): React.ReactElement => {
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<'success' | 'error' | 'neutral' | ''>('')
  const [timer, setTimer] = useState<string[]>(data.map(item => calculateTime(item.timeCreated, item.timeLeft)))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(data.map(item => calculateTime(item.timeCreated, item.timeLeft)))
    }, 1000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <div className={styles.cardContainer}>
      {data.length > 0 ? (
        data.map((res, index) => (
          <div className={`card ${styles.card}`} key={res.id}>
            {/* Card Image Container */}
            <div className={styles.cardImgContainer}>
              <Image
                src={res.img}
                width={200}
                height={150}
                className={styles.cardImg}
                alt="Bite Saver"
              />

              {timer[index] === '0:00'
                ? (
                  <div className={`${styles.time} ${styles.expiredTime}`}>
                    <span className={styles.timeText}>Expired</span>
                  </div>
                )
                : (
                  <div className={`${styles.normalTime} ${styles.time}`}>
                    <span className={styles.timeText}>{timer[index]} remaining</span>
                  </div>
                )
              }
            </div>

            {/* Card Body */}
            <div className={`text-accent-content card-body py-4 ${styles.cardBody}`}>
              <h3 className={`card-title text-2xl ${styles.cardTitle}`}>{res.name}</h3>
              <div className='flex flex-col items-center w-full'>
                <div className="flex justify-center items-center gap-1 text-sm mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                  </svg>
                  <span
                    className="cursor-pointer underline underline-offset-2 hover:text-blue-800"
                    onClick={() => {
                      navigator.clipboard.writeText(res.location)
                      setStatus('success')
                      setMessage('Successfully copied address')
                    }}
                  >
                    {res.location}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {res.tags.map(tag => (
                    <div key={tag} className={`badge badge-pill ${styles.typeBadge}`}>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 className="flex justify-center items-center">No listings available</h2>
      )}
      <FormMessage message={message} status={status} />
    </div>
  )
};

export default Card;
