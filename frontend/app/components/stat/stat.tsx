'use client'

import React, { useState, useEffect } from 'react'
import styles from './stat.module.css'

interface StatProps {
  title: string
  value: number
  icon: React.ReactElement
}

const Stat: React.FC<StatProps> = ({ title, value, icon }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let current = 0
    const intervalTime = 500 / value

    const increment = (): void => {
      if (current < value) {
        current += 1
        setDisplayValue(current)
      }
    }

    const interval = setInterval(increment, intervalTime)

    return () => {
      clearInterval(interval)
    }
  }, [value])

  return (
    <div className={`bg-secondary ${styles.stats}`}>
      <div className={`text-secondary-content ${styles.stat}`}>
        <div className={styles.statTitle}>{title}</div>
        <div className={styles.statValue}>
          {displayValue}
        </div>
      </div>
      <div className={styles.statFigure}>
        {icon}
      </div>
    </div>
  )
}

export default Stat
