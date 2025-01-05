import excalidrawAtom from '@/atoms/excalidrawAtom'
import ExcalidrawWrapper from '@/components/ExcalidrawWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useGetDraw, useUpdateDraw } from '@/lib/api'
import { serializeAsJSON } from '@excalidraw/excalidraw'
import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

export const Route = createFileRoute('/draw/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useGetDraw(parseInt(id))
  const [title, setTitle] = useState("")
  const { mutate } = useUpdateDraw()
  const { toast } = useToast()
  const [exApi, setExApi] = useAtom(excalidrawAtom)

  const handleExport = () => {
    if (!exApi) return
    const data = serializeAsJSON(
      exApi.getSceneElements(),
      exApi.getAppState(),
      exApi.getFiles(),
      'database',
    )

    mutate({ ID: parseInt(id), data, name: title }, {
      onSuccess: () => {
        toast({ title: "Draw Saved!", description: "drawing updated successfully" })
      }
    })
  }

  useEffect(() => {
    if (data) {
      setTitle(data.name)
    }
  }, [data])

  useEffect(() => {
    return () => {
      exApi?.resetScene()
      setExApi(null)
    }
  }, [])
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
