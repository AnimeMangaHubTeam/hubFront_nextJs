"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";

interface MangaPreviewProps {
  src: string;
  title: string;
  author: string;
  genres: string[];
  description: string;
}

export default function Component({ src, title, author, genres, description }: MangaPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleFocus = () => setIsHovered(true);
  const handleBlur = () => setIsHovered(false);

  return (
    <Card
      className="mx-auto overflow-hidden relative manga-preview-scrollbar shadow-md border-0"
      style={{
        width: "100%",
        maxWidth: "300px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div className="relative w-full" style={{ paddingBottom: "133.33%" }}>
        <Image
          src={src}
          alt={"Cover of manga"}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-75 p-4 transition-opacity duration-300 ease-in-out flex flex-col justify-between ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!isHovered}
        >
          <div className="overflow-y-auto text-white max-h-full">
            <p className="text-sm mb-2">by {author}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="bg-white/20 text-white">
                  {genre}
                </Badge>
              ))}
            </div>
            <p className="text-sm">
              {description}
            </p>
          </div>
          <Button className="w-full mt-4" variant="destructive">Read</Button>
        </div>
      </div>
      <CardFooter className={`pt-1 pb-1 transition-opacity duration-300 ease-in-out ${isHovered ? 'bg-black bg-opacity-75' : null}`}>
        <h2 className={`text-lg font-bold mb-1 w-full text-center ${isHovered ? 'text-slate-100': null}`}>{title}</h2>
      </CardFooter>
    </Card>
  );
}