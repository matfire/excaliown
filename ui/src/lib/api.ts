import { useMutation, useQuery } from "@tanstack/react-query";

const URL = import.meta.env.PROD ? "/" : "http://localhost:8080/"

export interface Draw {
  ID?: number
  data: string;
  name: string
  CreatedAt?: string
}

export function useGetDraws() {
  return useQuery({
    queryKey: ["draws"],
    queryFn: async (): Promise<Draw[]> => {
      const response = await fetch(`${URL}api/draw`)
      if (!response.ok) {
        throw new Error("could not get draws")
      }
      return response.json()
    }
  })
}

export function useGetDraw(id: number) {
  return useQuery({
    queryKey: ["draws", id],
    queryFn: async (): Promise<Draw> => {
      const response = await fetch(`${URL}api/draw/${id}`)
      if (!response.ok) {
        throw new Error("could not get draw")
      }
      return response.json()
    }
  })
}

export function useCreateDraw() {
  return useMutation({
    mutationFn: async (data: Draw): Promise<Draw> => {
      const response = await fetch(`${URL}api/draw`, {
        method: "POST",
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error("could not create draw")
      }
      return response.json()
    }
  })
}

export function useUpdateDraw() {
  return useMutation({
    mutationFn: async (data: Draw): Promise<Draw> => {
      const response = await fetch(`${URL}api/draw`, {
        method: "PUT",
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error("could not update draw")
      }
      return response.json()
    }
  })
}

export function useDeleteDraw() {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${URL}api/draw/${id}`, {
        method: "DELETE"
      })
      if (!response.ok) {
        throw new Error("could not delete draw")
      }
      return response.json()
    }
  })
}
