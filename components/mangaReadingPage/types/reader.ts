export interface ReaderSettings {
    readingMode: "vertical" | "horizontal"
    showAllChapters: boolean
    halfToneMode: boolean
    showPageNumbers: boolean
    showOriginal: boolean
    theme: "dark" | "light" | "system"
    pageTransitionArea: "image" | "fullscreen"
    imageFit: "width" | "height"
    menuDisplay: "scroll" | "click"
    containerWidth: number
    brightness: number
    autoScrollSpeed: number
  }
  
  export interface Chapter {
    id: number
    title: string
    volume: number
    chapter: number
  }
  
  export interface MangaPage {
    id: number
    url: string
    pageNumber: number
  }
  
  