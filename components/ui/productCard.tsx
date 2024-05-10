import Image from "next/image"
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/utils/format";
import { Card, CardContent } from "./card";

interface ProductCardProps {
  image_url: any;
  name: string
  description?: string;
  price: any;
}

export default function ProductCard({ description, image_url, name, price }: ProductCardProps) {

    return (
      <Card>
        <CardContent className="flex xl:flex-row pt-4 flex-col items-center gap-4 w-full">
              <Image 
                src={image_url} 
                alt={name} 
                height={0}
                width={0}
                sizes="100vw"
                className="h-full w-40 rounded-md hover:scale-110 hover:-rotate-2 duration-300" 
                style={{
                  objectFit: "contain",
                }}
              />
              <div className="w-full">
                <p className="font-bold">{name}</p>
                <p className="text-xs">{description}</p>

                <div className="flex items-center gap-2 justify-between md:mt-3">
                  <p className="font-bold text-lg">{formatPrice(price)}</p>
                  <Button size="icon" variant="outline" className="bg-gray-900 hover:bg-gray-800">
                      <ShoppingCart color="#fff" />
                  </Button>
                </div>
              </div>
         </CardContent>
      </Card>
    )

}