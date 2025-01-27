"use client"

import { Smartphone, Moon, Sun, Monitor, List, ImageIcon, Maximize2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import type { ReaderSettings } from "@/components/mangaReadingPage/types/reader"

interface SettingsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: ReaderSettings
  onSettingsChange: (settings: Partial<ReaderSettings>) => void
}

export function SettingsSheet({ open, onOpenChange, settings, onSettingsChange }: SettingsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] bg-zinc-900 text-white border-l border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-white">Настройки читалки</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">РЕЖИМ ЧТЕНИЯ</h3>
            <div className="flex justify-between gap-4">
              <Button
                variant={settings.readingMode === "vertical" ? "default" : "outline"}
                className="flex-1"
                onClick={() => onSettingsChange({ readingMode: "vertical" })}
              >
                <Smartphone className="h-4 w-4 rotate-0" />
              </Button>
              <Button
                variant={settings.readingMode === "horizontal" ? "default" : "outline"}
                className="flex-1"
                onClick={() => onSettingsChange({ readingMode: "horizontal" })}
              >
                <Smartphone className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">ВСЕ ГЛАВЫ ПОДРЯД</span>
              <Switch
                checked={settings.showAllChapters}
                onCheckedChange={(checked) => onSettingsChange({ showAllChapters: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">ПОЛНОЭКРАННЫЙ РЕЖИМ</span>
              <Switch
                checked={settings.halfToneMode}
                onCheckedChange={(checked) => onSettingsChange({ halfToneMode: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">НУМЕРАЦИЯ СТРАНИЦ</span>
              <Switch
                checked={settings.showPageNumbers}
                onCheckedChange={(checked) => onSettingsChange({ showPageNumbers: checked })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">ТЕМА</h3>
            <div className="flex justify-between gap-4">
              <Button
                variant={settings.theme === "dark" ? "default" : "outline"}
                className="flex-1"
                onClick={() => onSettingsChange({ theme: "dark" })}
              >
                <Moon className="h-4 w-4 mr-2" />
                Тёмная
              </Button>
              <Button
                variant={settings.theme === "light" ? "default" : "outline"}
                className="flex-1"
                onClick={() => onSettingsChange({ theme: "light" })}
              >
                <Sun className="h-4 w-4 mr-2" />
                Светлая
              </Button>
              <Button
                variant={settings.theme === "system" ? "default" : "outline"}
                className="flex-1"
                onClick={() => onSettingsChange({ theme: "system" })}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Системная
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">ОБЛАСТЬ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ</h3>
            <div className="flex justify-between gap-4">
              <Button
                variant={settings.pageTransitionArea === "image" ? "default" : "outline"}
                className="flex-1"
                onClick={() => onSettingsChange({ pageTransitionArea: "image" })}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Изображение
              </Button>
              <Button
                variant={settings.pageTransitionArea === "fullscreen" ? "default" : "outline"}
                className="flex-1"
                onClick={() => onSettingsChange({ pageTransitionArea: "fullscreen" })}
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                Весь экран
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">ШИРИНА КОНТЕЙНЕРА</h3>
            <Slider
              value={[settings.containerWidth]}
              min={300}
              max={1200}
              step={10}
              onValueChange={([value]) => onSettingsChange({ containerWidth: value })}
            />
            <div className="text-right text-sm text-zinc-400">{settings.containerWidth}px</div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">ЯРКОСТЬ ИЗОБРАЖЕНИЙ</h3>
            <Slider
              value={[settings.brightness]}
              min={0}
              max={100}
              onValueChange={([value]) => onSettingsChange({ brightness: value })}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">СКОРОСТЬ АВТОПРОКРУТКИ</h3>
            <Slider
              value={[settings.autoScrollSpeed]}
              min={0}
              max={100}
              onValueChange={([value]) => onSettingsChange({ autoScrollSpeed: value })}
            />
            <div className="text-right text-sm text-zinc-400">
              {settings.autoScrollSpeed === 0 ? "МЕДЛЕННО" : settings.autoScrollSpeed === 100 ? "БЫСТРО" : ""}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

