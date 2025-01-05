import { Draw, useDeleteDraw } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface DrawCardProps {
  draw: Draw
}
export default function DrawCard({ draw }: DrawCardProps) {
  const { mutate } = useDeleteDraw()
  const queryClient = useQueryClient()
  const { toast } = useToast()


  const handleDelete = () => {
    if (!draw.ID) return
    mutate(draw.ID, {
      onSettled(data, error) {
        console.log(data, error)
      },
      onSuccess: () => {
        toast({ title: "Drawing deleted!", description: `Drawing "${draw.name}" was deleted` })
        queryClient.invalidateQueries({ queryKey: ["draws"] })
      }
    })
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{draw.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {/*<img
          src={drawing.thumbnail}
          alt={`Thumbnail for ${drawing.name}`}
          className="w-full h-40 object-cover rounded-md"
        /> */}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{draw?.CreatedAt ? new Date(draw?.CreatedAt).toLocaleString() : ""}</span>
        <Button variant="outline" asChild>
          <Link to="/draw/$id" params={{ id: draw.ID?.toString() ?? "" }}>
            Open
          </Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="icon"><Trash /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this excalidraw drawing from this application
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
