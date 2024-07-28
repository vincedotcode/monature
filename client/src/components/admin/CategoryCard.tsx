"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteCategory } from "@/services/category"
import { useToast } from "@/components/ui/use-toast"
type Category = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

type Props = {
  category: Category
  onDelete: (id: string) => void
}

const CategoryCard: React.FC<Props> = ({ category, onDelete }) => {
  const { toast } = useToast()
  const handleDelete = async () => {

    try {
      await deleteCategory(category._id)
      onDelete(category._id)
      toast({
          variant: 'default',
          title: 'Category deleted successfully',
          description: 'The category has been deleted.',
      });
  } catch (error) {
      toast({
          variant: 'destructive',
          title: 'Error deleting category',
          description: 'There was a problem deleting the category.',
      });
  }
    
  }

  return (
    <Card className="w-full max-w-sm p-6 bg-muted rounded-lg">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{category.name}</h3>
        <p className="text-muted-foreground">
          {category.description}
        </p>
        <div className="text-xs text-muted-foreground">Created on {new Date(category.createdAt).toLocaleDateString()}</div>
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" className="text-red-500" onClick={handleDelete}>
            <Trash className="w-5 h-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CategoryCard
