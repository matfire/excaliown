import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { serializeAsJSON } from '@excalidraw/excalidraw'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useToast } from '@/hooks/use-toast'
import { useCreateDraw } from '@/lib/api'
import ExcalidrawWrapper from '@/components/ExcalidrawWrapper'
import excalidrawAtom from '@/atoms/excalidrawAtom'
import { useAtomValue } from 'jotai'

export const Route = createFileRoute('/draw/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [title, setTitle] = useState('')
  const { toast } = useToast()
  const { mutate } = useCreateDraw()
  const exApi = useAtomValue(excalidrawAtom)
  const navigate = useNavigate({ from: "/draw" })
  const handleExport = () => {
    if (!exApi) {
      return
    }
    if (!title) {
      toast({
        title: 'invalid data',
        description: 'please make sure to provide a title',
        variant: 'destructive',
      })
      return
    }
    const data = serializeAsJSON(
      exApi.getSceneElements(),
      exApi.getAppState(),
      exApi.getFiles(),
      'database',
    )
    mutate(
      { name: title, data: data },
      {
        onSuccess: (data) => {
          console.log(data)
          toast({
            title: 'All Done!',
            description: 'Your drawing has been saved',
          })
          navigate({ to: "/draw/$id", params: { id: data.ID!.toString() } })
        },
        onError: () => {
          toast({
            title: 'something went wrong',
            description: 'could not save this drawing, please try again later',
          })
        },
      },
    )
  }

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
      <ExcalidrawWrapper />
    </React.Fragment>
  )
}
