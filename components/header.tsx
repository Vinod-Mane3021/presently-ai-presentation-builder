import ImportButton from '@/components/import-button'
import { ModeToggle } from '@/components/mode-toggle'
import NewProjectButton from '@/components/new-project'
import SearchInput from '@/components/search-input'
import React from 'react'

export const Header = () => {
  return (
    <div className='w-full flex items-center gap-x-6'>
        <SearchInput/>
        <ModeToggle/>
        <div className='flex items-center gap-x-4'>
          <ImportButton/>
          <NewProjectButton/>
        </div>
    </div>
  )
}