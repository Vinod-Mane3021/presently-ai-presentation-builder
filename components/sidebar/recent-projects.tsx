import { useGetRecentProjects } from '@/hooks/api/use-get-recent-projects'
import React from 'react'

export const RecentProjects = () => {
  const { data, isLoading } = useGetRecentProjects()

  if(!data?.data) {
    return null;
  }

  if(isLoading) {
    return <p>loading...</p>
  }

  return (
    <div className='px-4 pt-5 text-sm group-data-[collapsible=false]:hodden'>
      <p className='text-muted-foreground'>Recently Opened</p>
      <div className='space-y-4 mt-5'>
        {data.data.map(project => (
          <p key={project.id} className='w-full truncate'>{project.title}</p>
        ))}
      </div>
    </div>
  )
}
