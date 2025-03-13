import React from 'react'
import { Button } from '../ui/button'
import { useSidebar } from '../ui/sidebar';

const Upgrade = () => {
  const { open } = useSidebar();
  if(!open) {
    return null
  }
  return (
    <div className='bg-accent p-2 rounded-lg'>
        <h1 className='font-bold'>Get <span className='text-presently'>Creative AI</span></h1>
        <p className='text-muted-foreground text-sm'>Unlock all features including AI and more</p>


        <Button className='w-full border-presently mt-5' variant="outline">
            Upgrade
        </Button>
    </div>
  )
}

export default Upgrade