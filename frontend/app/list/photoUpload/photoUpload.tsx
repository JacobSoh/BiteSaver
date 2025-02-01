import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './photoUpload.module.css'

interface PhotoUploadProps {
  onFileChange: (file: File | undefined, fileURL: string | undefined) => void
  initialFileURL: string
  initialFile: File | undefined
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileChange, initialFileURL, initialFile }) => {
  const [file, setFile] = useState<File | undefined>(initialFile)
  const [fileURL, setFileURL] = useState<string | undefined>(initialFileURL)
  const foodImg: string = '/food.jpg'

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputFile = e.target.files?.[0]
    if (fileURL !== undefined) {
      URL.revokeObjectURL(fileURL)
    }
    if (inputFile !== undefined) {
      setFile(inputFile)
      const url = URL.createObjectURL(inputFile)
      setFileURL(url)
      onFileChange(inputFile, url)
    } else {
      setFile(undefined)
      setFileURL(undefined)
      onFileChange(undefined, undefined)
    }
  }

  const handleFileRemove = (): void => {
    if (fileURL !== undefined) {
      URL.revokeObjectURL(fileURL)
    }
    setFile(undefined)
    setFileURL(undefined)
    onFileChange(undefined, undefined)
  }

  useEffect(() => {
    return () => {
      if (fileURL !== undefined) {
        URL.revokeObjectURL(fileURL)
      }
    }
  }, [fileURL])

  return (
    <div className={styles.projectPicture}>
      <span className={styles.formLabel}>Food Picture</span>
      <div className={styles.pictureContainer}>
        <Image
          className={styles.currentPic}
          src={((fileURL !== undefined) && (file !== undefined)) ? fileURL : foodImg}
          alt={((fileURL !== undefined) && (file !== undefined)) ? file.name : ''}
          height={225}
          width={300}
        />
        <div className={styles.actionContainer}>
          <div className={styles.picActions}>
            <div className={styles.photoUpload}>
              <label htmlFor="photoUpload" className={styles.photoUploadLabel}>Upload photo</label>
              <input
                id="photoUpload"
                className={styles.photoUploadInput}
                type="file"
                name="photoUpload"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button
              type='button'
              className={styles.photoDelete}
              onClick={handleFileRemove}
              disabled={file === null || file === undefined}
              aria-disabled={file === null || file === undefined}
            >
              Remove
            </button>
          </div>
          <span className={styles.actionRemind}>At least 132 x 132px PNG or JPG file</span>
        </div>
      </div>
    </div>
  )
}

export default PhotoUpload
