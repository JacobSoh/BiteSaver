'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import styles from './search.module.css'
import { useDebouncedCallback } from 'use-debounce'
import React, { useState } from 'react'
import { ring2 } from 'ldrs'
import { AutoComplete } from 'antd'

interface SearchProps {
  placeholder: string
  type?: string
  options: Array<{ value: string }>
}

const Search = ({ placeholder, type = 'title', options }: SearchProps): React.ReactElement => {
  const [allOptions, setAllOptions] = useState<Array<{ value: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((text: string) => {
    setIsLoading(true)
    ring2.register()

    if (text.length > 0) {
      const filteredOptions = options.filter(option => option.value.toLowerCase().includes(text.toLowerCase()))
      setAllOptions(filteredOptions)
    } else {
      setAllOptions([])
    }

    const params = new URLSearchParams(searchParams)
    params.delete('page')

    if (text.length > 0) {
      params.set(type, text)
    } else {
      params.delete(type)
    }

    router.replace(`${pathname}?${params.toString()}`)

    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, 300)

  const handleSelect = (value: string): void => {
    // Clear options on selection
    setAllOptions([])
    const params = new URLSearchParams(searchParams)
    params.delete('page')
    params.set(type, value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={`bg-slate-200 ${styles.container}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <AutoComplete
        options={allOptions}
        style={{ width: '100%', paddingRight: '32px', color: '#341009'}}
        placeholder={placeholder}
        onSearch={handleSearch}
        onSelect={handleSelect}
        variant="borderless"
        popupClassName={styles.dropdown}
      />
      {isLoading &&
        <div className={styles.spinner}>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      }
    </div>
  )
}

export default Search
