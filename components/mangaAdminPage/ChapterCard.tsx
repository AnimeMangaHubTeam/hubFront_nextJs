"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChapterDetailsModal } from "@/components/mangaAdminPage/modals/ChapterDetailsModal"

interface ChapterCardProps {
  chapter: {
    id: number
    title: string
    number: number
    // ... other chapter properties
  }
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Chapter {chapter.number}: {chapter.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setShowDetailsModal(true)}>Manage Pages</Button>
      </CardContent>
      <ChapterDetailsModal chapter={chapter} open={showDetailsModal} onOpenChange={setShowDetailsModal} />
    </Card>
  )
}

