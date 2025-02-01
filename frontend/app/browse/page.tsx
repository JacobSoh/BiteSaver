'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '../components/card/card';
import Search from '../components/search/search';
import { getData } from '@/config/axios';

interface Item {
  id: number;
  img: string;
  name: string;
  location: string;
  portions: number;
  timeCreated: Date;
  timeLeft: number;
  tags: string[];
  userId: string | null;
}

type DataArray = Array<Item>;
type Options = {
  value: string;
}[]

const calculateTime = (timeCreated: Date, timeLeft: number): number => {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime.getTime() - timeCreated.getTime()) / 1000);
  const remainingSeconds = Math.max(0, timeLeft * 60 - elapsedTime);
  return remainingSeconds;
};

const Browse = (): React.ReactElement => {
  const searchParams = useSearchParams();
  const [receivedData, setReceivedData] = useState<DataArray>([]);
  const [filteredData, setFilteredData] = useState<DataArray>([]);
  const [allOptions, setAllOptions] = useState<Options>([]);
  const [loading, setLoading] = useState(true);

  const filterData = (data:DataArray) => {
    const searchQuery = (searchParams.get('title') || '').toLowerCase();
    return data.filter((data) => data.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      const remainingTimeA = calculateTime(a.timeCreated, a.timeLeft);
      const remainingTimeB = calculateTime(b.timeCreated, b.timeLeft);
      return remainingTimeB - remainingTimeA;
    });
  };


  useEffect(() => {
    setLoading(true);
    getData("/restaurant")
    .then((response) => {
      const rData = response.doc.map((item:Item) => ({
        ...item,
        timeCreated: new Date(item.timeCreated)
      }));
      setReceivedData(rData);
      setAllOptions(receivedData.map((data:Item) => ({ value: data.name })));
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
    setLoading(false);
  },[]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setFilteredData(filterData(receivedData));
      setLoading(false);
    }, 500); // Show spinner for 1 second
  }, [searchParams, receivedData]);

  return (
    <div className="mt-6" data-theme="night">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-primary text-center text-4xl font-bold">Browse</h1>
        <span>
          Explore free food from restaurants near you, available before it&apos;s thrown away.
        </span>
        <div>
          <Search placeholder="Search listing" options={allOptions} />
        </div>
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : filteredData.length > 0 ? (
            <Card data={filteredData} />
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No listings found. Check the search bar for typos or reset your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
