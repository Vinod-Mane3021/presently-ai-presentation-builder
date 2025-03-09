'use client'

import { useGetProjects } from '@/features/project/api/use-get-projects'
import React, { useEffect } from 'react'

const DashboardPage = () => {
  const allProjects = useGetProjects()
  useEffect(() => {
    console.log({allProjects: allProjects.data})
  }, [allProjects.data])
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage