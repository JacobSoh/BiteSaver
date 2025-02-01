"use client"
import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import { usePathname } from "next/navigation";
import Image from 'next/image';

type NavItem = {
  title: string;
  path: string;
}[];

const NavBar = ({ tabs, isPriv }: { tabs: NavItem, isPriv: Boolean }): React.ReactElement => {
  const pathname = usePathname()
  const maindir = '/' + pathname.split('/')[1]

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div className="btn btn-ghost flex justify-center items-center gap-2 hover:bg-none">
          <Image src="/bitesaver.png" priority alt="Bitesaver Logo" width={48} height={48} />
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="text-xl">BiteSaver</a>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal mx-1">
          {tabs.map(tab => (
            <li className="mr-3 font-bold cursor-pointer" key={tab.path}>
              <a href={tab.path} className={maindir === tab.path ? 'btn-active btn-disabled' : ''}>{tab.title}</a>
            </li>
          ))}
          {isPriv ? (
            <a href='/logout' className={'btn-active'}>
              <button className={`btn btn-sm btn-primary ${styles.button}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </a>
          ) : (
            <a href='/login' className={maindir === '/login' ? 'btn-active btn-disabled' : 'cursor-pointer'}>
              <button className={`btn btn-sm btn-primary ${styles.button}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
                Login
              </button>
            </a>
          )}

        </ul>
      </div>
    </div>
  )
}

export default NavBar