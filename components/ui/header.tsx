"use client";
import Image from "next/image";
import HeaderLogo from "@/public/bife.jpg";
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
    <header className="relative h-[420px] w-full bg-zinc-900 bg-home bg-cover bg-center">
      <div className="absolute right-5 top-5 text-white xl:right-10">
        {data?.user ? (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-3xl bg-transparent hover:bg-transparent hover:text-white/70"
              onClick={() => signOut()}
            >
              <h1>Fazer logout</h1>
            </Button>
            {data.user.image && (
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar>
                    <AvatarImage src={data.user.image} />
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="mr-5 bg-white/80">
                  <h1 className="text-base font-semibold">{data.user.name}</h1>
                  <span className="text-sm">{data.user.email}</span>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            className="rounded-3xl bg-transparent hover:bg-transparent hover:text-white/70"
            onClick={handleLoginClick}
          >
            <h1>Fazer login</h1>
          </Button>
        )}
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center">
        <Image
          src={HeaderLogo}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="h-32 w-32 rounded-full shadow-lg duration-200 hover:scale-110"
        />
        <h1 className="mb-2 mt-4 text-4xl font-bold text-white">
          Dev Churrascaria
        </h1>
        <span className="font-medium capitalize text-white">
          rua 10, centro, campo grande - MS
        </span>

        <div className="mt-5 rounded-lg bg-green-600 px-4 py-1">
          <span className="font-medium text-white">
            Seg a Dom - 18:00 as 22:00
          </span>
        </div>
      </div>
    </header>
  );
}
