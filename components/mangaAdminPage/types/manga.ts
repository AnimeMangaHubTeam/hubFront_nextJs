export interface Manga {
    id: number
    title: string
    imageUrl?: string
  }
  
  export interface Chapter {
    id: number
    mangaId: string
    chapterNumber: number
    title: string
  }
  
  export interface Page {
    id: number
    chapterId: number
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
  
  