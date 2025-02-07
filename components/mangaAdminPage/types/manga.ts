export interface Manga {
    id: string
    title: string
    coverUrl?: string
  }
  
  export interface Chapter {
    id: string
    mangaId: string
    chapterNumber: number
    title: string
  }
  
  export interface Page {
    id: string
    chapterId: string
    pageNumber: number
    imageUrl: string
  }
  
  export interface TranslatorTeam {
    id: string
    name: string
    profilePhotoUrl?: string
  }
  
  export interface User {
    id: string
    name: string
  }
  
  