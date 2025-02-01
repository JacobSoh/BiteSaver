"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Footer = (): React.ReactElement => {
  return (
    <footer className="footer  items-center p-4">
      <aside className="grid-flow-col items-center">
        <Image src="/bitesaver.png" priority alt="Bitesaver Logo" width={96} height={96} />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="/browse" className="link link-hover">Browse</a>
        <a href="/list" className="link link-hover">List</a>
        <a href="/faq" className="link link-hover">FAQ</a>
        <a href="/" className="link link-hover">User Guide</a>
      </nav>
    </footer>
  )
}

export default Footer