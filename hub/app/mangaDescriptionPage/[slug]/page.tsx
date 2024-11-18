'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, MessageSquare, ThumbsUp, ThumbsDown, Star, Calendar, BookMarked, ChevronRight, CornerDownRight, X } from 'lucide-react'

type Comment = {
  id: number;
  user: string;
  content: string;
  likes: number;
  dislikes: number;
  avatar: string;
  replies: Comment[];
}

export default function MangaPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "SpaceExplorer",
      content: "This manga is out of this world! Can't wait for the next chapter!",
      likes: 15,
      dislikes: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      replies: [
        {
          id: 3,
          user: "StarGazer",
          content: "I know right? The cliffhanger at the end of the last chapter was intense!",
          likes: 8,
          dislikes: 1,
          avatar: "/placeholder.svg?height=40&width=40",
          replies: [
            {
              id: 4,
              user: "CosmicReader",
              content: "That plot twist caught me completely off guard. The author is a genius!",
              likes: 5,
              dislikes: 0,
              avatar: "/placeholder.svg?height=40&width=40",
              replies: [],
            }
          ]
        }
      ]
    },
    {
      id: 2,
      user: "GalacticReader",
      content: "The artwork is stunning, especially the alien landscapes.",
      likes: 12,
      dislikes: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      replies: [
        {
          id: 5,
          user: "ArtEnthusiast",
          content: "Agreed! The attention to detail in each panel is remarkable.",
          likes: 6,
          dislikes: 1,
          avatar: "/placeholder.svg?height=40&width=40",
          replies: [],
        }
      ]
    },
  ])
  const [mangaData, setMangaData] = useState({
    title: "Cosmic Odyssey",
    cover: "/placeholder.svg?height=400&width=300",
    description: "Join the interstellar adventure of Captain Zara and her diverse crew as they navigate the challenges of deep space exploration, encounter alien civilizations, and uncover the mysteries of the universe.",
    author: "Stella Novacraft",
    artist: "Luna Stardust",
    status: "Ongoing",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    chapters: 42,
    lastUpdated: "2023-11-15",
    rating: 4.7,
    totalRatings: 1000,
  })

  const handleRating = (rating: number) => {
    if (isLoggedIn) {
      setUserRating(rating)
      const newTotalRatings = mangaData.totalRatings + 1
      const newRating = ((mangaData.rating * mangaData.totalRatings) + rating) / newTotalRatings
      setMangaData({
        ...mangaData,
        rating: Number(newRating.toFixed(1)),
        totalRatings: newTotalRatings
      })
    } else {
      alert("Please log in to rate this manga.")
    }
  }

  const handleReply = (commentId: number) => {
    if (isLoggedIn) {
      setReplyingTo(commentId)
      setReplyContent('')
    } else {
      alert("Please log in to reply to comments.")
    }
  }

  const submitReply = (parentId: number) => {
    if (replyContent.trim() === '') return

    const newReply: Comment = {
      id: Date.now(),
      user: "CurrentUser",
      content: replyContent,
      likes: 0,
      dislikes: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      replies: [],
    }

    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, newReply] }
        } else if (comment.replies.length > 0) {
          return { ...comment, replies: addReplyToComment(comment.replies) }
        }
        return comment
      })
    }

    setComments(addReplyToComment(comments))
    setReplyingTo(null)
    setReplyContent('')
  }

  const CommentComponent = ({ comment, depth = 0 }: { comment: Comment, depth?: number }) => (
    <div className={`mt-4 ${depth > 0 ? 'ml-6' : ''}`}>
      <div className="flex items-start space-x-4">
        <Image
          src={comment.avatar}
          alt={comment.user}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold text-blue-400">{comment.user}</p>
          <p className="mt-1 text-gray-300">{comment.content}</p>
          <div className="flex items-center mt-2 space-x-4 text-sm">
            <button className="flex items-center text-gray-400 hover:text-blue-400">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{comment.likes}</span>
            </button>
            <button className="flex items-center text-gray-400 hover:text-red-400">
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{comment.dislikes}</span>
            </button>
            <button 
              className="flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => handleReply(comment.id)}
            >
              <CornerDownRight className="h-4 w-4 mr-1" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
      {replyingTo === comment.id && (
        <div className="mt-4 ml-10">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            className="bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
          <div className="mt-2 flex justify-end space-x-2">
            <Button 
              onClick={() => setReplyingTo(null)}
              variant="outline"
              size="sm"
              className="text-gray-400 hover:text-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => submitReply(comment.id)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Reply
            </Button>
          </div>
        </div>
      )}
      {comment.replies.map(reply => (
        <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto mt-24">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3">
            <div className="relative group">
              <Image
                src={mangaData.cover}
                alt={mangaData.title}
                width={300}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Read Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-5 h-5 mr-1" />
                  <span className="font-bold text-lg">{mangaData.rating}</span>
                  <span className="text-sm text-gray-400 ml-1">({mangaData.totalRatings})</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-xs">{mangaData.lastUpdated}</span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm mb-2 text-gray-300">Rate this manga:</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-8 h-8 ${
                        star <= (hoverRating || userRating) ? 'text-yellow-400' : 'text-gray-600'
                      } hover:text-yellow-300 transition-colors`}
                      aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                      <Star className="w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {mangaData.title}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-gray-300">{mangaData.description}</p>
            <Card className="bg-gray-800 text-gray-100 border-gray-800 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-1 text-sm">Author</p>
                    <p className="font-semibold">{mangaData.author}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 text-sm">Artist</p>
                    <p className="font-semibold">{mangaData.artist}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 text-sm">Status</p>
                    <p className="font-semibold">{mangaData.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 text-sm">Genres</p>
                    <div className="flex flex-wrap gap-2">
                      {mangaData.genres.map((genre) => (
                        <span key={genre} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-200">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 text-sm">Chapters</p>
                    <p className="font-semibold">{mangaData.chapters}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 text-sm">Last Updated</p>
                    <p className="font-semibold">{mangaData.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg py-6 shadow-lg transition-transform hover:scale-105">
                <BookMarked className="mr-2 h-5 w-5" /> Continue Reading
              </Button>
            ) : (
              <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg transition-transform hover:scale-105">
                <BookOpen className="mr-2 h-5 w-5" /> Start Reading
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="chapters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 rounded-lg p-1 shadow-md">
            <TabsTrigger value="chapters" className="data-[state=active]:bg-gray-800 rounded-md transition-all">
              Chapters
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-gray-800 rounded-md transition-all">
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chapters">
            <Card className="bg-gray-800 border-gray-800 mt-6">
              <CardContent className="p-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(mangaData.chapters)].map((_, index) => (
                      <Button
                        key={index + 1}
                        variant={selectedChapter === index + 1 ? "default" : "outline"}
                        className={`h-16 ${selectedChapter === index + 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all hover:scale-100 flex flex-col items-start justify-center p-4`}
                        onClick={() => setSelectedChapter(index + 1)}
                      >
                        <span className="text-lg font-semibold">Chapter {index + 1}</span>
                        <span className="text-xs text-gray-400">Last read: 2 days ago</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comments">
            <div className="space-y-6 mt-6">
              {comments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
              <div className="mt-6">
                <Textarea
                  placeholder="Add a comment..."
                  className="bg-gray-800 text-gray-100 border-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                />
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-lg py-4 px-6 shadow-lg transition-transform hover:scale-105">
                  <MessageSquare className="mr-2 h-5 w-5" /> Post Comment
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}