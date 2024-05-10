"use client";
import Image from "next/image";
import HeaderLogo from "@/public/hamb-1.png";
import { Button } from "./button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

export default function Header() {

  const { data } = useSession();

  async function handleLoginClick() {
    await signIn();
  } 

  return (
    <header className="relative w-full h-[420px] bg-zinc-900 bg-home bg-cover bg-center">
      <div className="absolute top-5 xl:right-10 right-5 text-white">
        {
          data?.user ? (
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-transparent hover:bg-transparent hover:text-white/70 rounded-3xl" onClick={() => signOut()}>
                <h1>Fazer logout</h1>
              </Button>
              {
                data.user.image && (
                  <HoverCard>
                    <HoverCardTrigger>
                      <Avatar>
                        <AvatarImage src={data.user.image} />
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white/80 mr-5">
                      <h1 className="text-base font-semibold">{data.user.name}</h1>
                      <span className="text-sm">{data.user.email}</span>
                    </HoverCardContent>
                  </HoverCard>
                )
              }             
            </div>
          ) : (
            <Button variant="outline" className="bg-transparent hover:bg-transparent hover:text-white/70 rounded-3xl" onClick={handleLoginClick}>
              <h1>Fazer login</h1>
            </Button>
          )
        }
      </div>
      
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image
          src={HeaderLogo}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 h-32 rounded-full shadow-lg hover:scale-110 duration-200"
        />
        <h1 className="text-4xl mt-4 mb-2 font-bold text-white">Dev Burguer</h1>
        <span className="text-white capitalize font-medium">
          rua 10, centro, campo grande - MS
        </span>

        <div className="bg-green-600 px-4 py-1 rounded-lg mt-5">
          <span className="font-medium text-white">Seg a Dom - 18:00 as 22:00</span>
        </div>
      </div>
    </header>
  );
}
