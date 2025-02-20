"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import Image from "next/image"

interface ChapterDetailsModalProps {
  chapter: {
    id: number
    title: string
    number: number
    // ... other chapter properties
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChapterDetailsModal({ chapter, open, onOpenChange }: ChapterDetailsModalProps) {
  const [pages, setPages] = useState<{ id: number; imageUrl: string }[]>([]) // Fetch pages from API

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination.index === undefined) return

    const newPages = Array.from(pages)
    const [reorderedItem] = newPages.splice(result.source.index, 1)
    newPages.splice(result.destination.index, 0, reorderedItem)

    setPages(newPages)
  }

  const handleSavePages = async () => {
    // Send the reordered pages to the API
    // You'll need to implement this function to send the data to your backend
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Chapter {chapter.number}: {chapter.title}
          </DialogTitle>
        </DialogHeader>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="pages">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {pages.map((page, index) => (
                  <Draggable key={page.id} draggableId={page.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center space-x-4 bg-muted p-2 rounded-md"
                      >
                        <span className="font-medium">Page {index + 1}</span>
                        <Image
                          src={page.imageUrl || "/placeholder.svg"}
                          alt={`Page ${index + 1}`}
                          width={100}
                          height={150}
                          className="object-cover"
                        />
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex justify-between mt-4">
          <Button>Add New Page</Button>
          <Button onClick={handleSavePages}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

