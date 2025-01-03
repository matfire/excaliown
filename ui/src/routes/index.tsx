import DrawCard from '@/components/DrawCard'
import { Button } from '@/components/ui/button'
import { useGetDraws } from '@/lib/api'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: drawings, isLoading } = useGetDraws()
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stored Drawings</h1>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link to="/draw">
            <Plus className="mr-2 h-4 w-4" /> New Drawing
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drawings?.map((drawing) => (
          <DrawCard key={drawing.ID} draw={drawing} />
        ))}
      </div>
    </div>)
}
