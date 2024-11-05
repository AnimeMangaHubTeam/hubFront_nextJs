"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";

export default function Component() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleFocus = () => setIsHovered(true);
  const handleBlur = () => setIsHovered(false);

  return (
    <Card
      className="mx-auto overflow-hidden relative"
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
          src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=960/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpg"
          alt="Cover of One Piece manga"
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-75 p-4 transition-opacity duration-300 ease-in-out flex flex-col justify-between ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!isHovered}
        >
          <div className="overflow-y-auto text-white">
            <p className="text-sm mb-2">by Eiichiro Oda</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                Adventure
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Fantasy
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Action
              </Badge>
            </div>
            <p className="text-sm">
              Follow Monkey D. Luffy and his swashbuckling crew in their search
              for the ultimate treasure, One Piece. Their journey takes them far
              and wide in this epic manga series.
            </p>
          </div>
          <Button className="w-full mt-4" variant="destructive">Read</Button>
        </div>
      </div>
      <CardFooter className={`pt-1 pb-1 transition-opacity duration-300 ease-in-out ${isHovered ? 'bg-black bg-opacity-75' : null}`}>
        <h2 className={`text-lg font-bold mb-1 w-full text-center ${isHovered ? 'text-slate-100': null}`}>One Piece</h2>
      </CardFooter>
    </Card>
  );
}
