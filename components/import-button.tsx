import React from 'react'
import { Button } from './ui/button'
import { Import } from 'lucide-react'

const ImportButton = () => {
  return (
    <Button  variant="outline" className='flex items-center px-10 bg-accent'>
        <Import className='size-4'/>
        Import
    </Button>
  )
}

export default ImportButton