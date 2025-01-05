import excalidrawAtom from "@/atoms/excalidrawAtom";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useTheme } from "./theme-provider";

interface ExcalidrawWrapperProps {
  data?: string;
}

export default function ExcalidrawWrapper({ data }: ExcalidrawWrapperProps) {
  const [excalidraw, setExcalidrawAtom] = useAtom(excalidrawAtom)
  const theme = useTheme()

  useEffect(() => {
    if (data && excalidraw) {
      excalidraw?.updateScene(JSON.parse(data))
    }

  }, [data, excalidraw])

  return (
    <React.Fragment>
      <div style={{ height: '100%', width: '100%' }}>
        <Excalidraw
          theme={theme.theme == 'dark' ? 'dark' : 'light'}
          excalidrawAPI={setExcalidrawAtom}
        />
      </div>
    </React.Fragment>
  )
}
