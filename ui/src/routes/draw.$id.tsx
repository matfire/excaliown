import ExcalidrawWrapper from '@/components/ExcalidrawWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGetDraw, useUpdateDraw } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useState } from 'react'

export const Route = createFileRoute('/draw/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useGetDraw(parseInt(id))
  const [title, setTitle] = useState("")
  const queryClient = useQueryClient()
  const { mutate } = useUpdateDraw()

  const handleExport = () => {

  }

  useEffect(() => {
    if (data) {
      setTitle(data.name)
    }
    console.log(data)
    return () => {
      queryClient.invalidateQueries({ queryKey: ["draws", id] })
    }
  }, [data])
  return (
    <React.Fragment>
      <div className="flex items-center justify-between p-4 bg-background border-b">
        <Input
          required
          type="text"
          placeholder="Enter drawing title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-64"
        />
        <Button onClick={handleExport}>Save Drawing</Button>
      </div>
      <ExcalidrawWrapper data={data?.data} />
    </React.Fragment>
  )
}
