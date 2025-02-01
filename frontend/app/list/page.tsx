"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './list.module.css';
import PhotoUpload from './photoUpload/photoUpload';
import TagsInput from './TagsInput/tagsInput';
import { postData, postImgData } from '@/config/axios';
import { useRouter } from 'next/navigation';

interface UserInput {
  name: string;
  location: string;
  portions: number;
  tags: string[];
  timeLeft: string;
}

const List = (): React.ReactElement => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileURL, setFileURL] = useState<string | undefined>(undefined)
  const foodImg: string = '/food.jpg'
  const router = useRouter();

  const [inputs, setInputs] = useState<UserInput>({
    name: "",
    location: "",
    portions: 0,
    tags: [],
    timeLeft: ""
  });

  const calculateTimeDiff = async (end:string) => {
    const [hour, minute] = end.split(":").map(value => parseInt(value, 10));
    const timeCreated = new Date;
    const timeLeftInput = new Date(timeCreated.getFullYear(), timeCreated.getMonth(), timeCreated.getDate(), hour, minute, timeCreated.getSeconds());
    var difference = Math.floor((timeLeftInput.getTime() - timeCreated.getTime()) / (60 * 1000));
    if (difference < 0) {
      difference = 0
    };
    return [timeCreated.getTime(), difference]
  };

  const handleTagsChange = (tags: string[]) => {
    setInputs((prev) => ({ ...prev, tags }))
  }

  const handleFileChange = (inputFile: File | undefined, url: string | undefined): void => {
    setFile(inputFile)
    setFileURL(url)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var upImgFile = fileURL;
    const [timeCreated, timeLeft] = await calculateTimeDiff(inputs["timeLeft"]);

    if (file) {
      const fd = new FormData();
      fd.append("file", file);

      try {
        const response = await postImgData("/restaurant/create/image", fd);
        upImgFile = response.fileUrl;
      } catch (error) {
        console.log("Error uploading file: ", error);
      };
    };

    const data = {
      img: upImgFile,
      name: inputs["name"],
      location: inputs["location"],
      portions: inputs["portions"],
      timeCreated,
      timeLeft,
      tags: inputs["tags"]
    };

    try {
      const res = await postData("/restaurant/create", data)
      if (res.resId) {
        router.refresh();
      } else {
        throw new Error("Failed");
      };
    } catch (error) {
      console.error("Error in listing: ", error);
    };

    // postData("/restaurant/create", {
    //   img: upImgUrl,
    //   name: inputs["name"],
    //   location: inputs["location"],
    //   portions: inputs["portions"],
    //   timeCreated,
    //   timeLeft,
    //   tags: inputs["tags"]
    // })
    // .then((response) => {
    //   if (response.resId) {
    //     router.refresh();
    //   } else {
    //     throw new Error();
    //   };
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-primary text-center text-4xl font-bold">List</h1>
        <span className="">Help reduce food waste by listing surplus food your restaurant is offering for free.</span>
        <form onSubmit={handleSubmit} className="mt-6 flex gap-12">
          <PhotoUpload onFileChange={handleFileChange} initialFileURL={fileURL ?? foodImg} initialFile={file} />
          <div className="flex flex-col gap-4 mt-6">
            <div className={styles.formInput}>
              <label htmlFor='name' className={styles.formLabel}>Restaurant Name</label>
              <input type='text' className={styles.inputBox} name='name' id='name' onChange={handleChange} required />
            </div>
            <div className={styles.formInput}>
              <label htmlFor='location' className={styles.formLabel}>Location</label>
              <input type='text' className={styles.inputBox} name='location' id='location' onChange={handleChange} required />
            </div>
            <div className={styles.formInput}>
              <label htmlFor='portions' className={styles.formLabel}>Portions</label>
              <input type='number' className={styles.inputBox} name='portions' id='portions' onChange={handleChange} required />
            </div>
            <TagsInput onTagsChange={handleTagsChange} />
            
            <div className={styles.formInput}>
              <label htmlFor="timeLeft" className={styles.formLabel}>Time Limit</label>
              <input type="time" id="timeLeft" name="timeLeft" onChange={handleChange} required className={styles.inputBox} />
            </div>

            <button className='btn btn-primary'>List</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default List