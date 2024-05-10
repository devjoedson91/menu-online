import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/utils/format";
import { Card, CardContent } from "./card";

interface ProductCardProps {
  image_url: any;
  name: string;
  description?: string;
  price: any;
}

export default function ProductCard({
  description,
  image_url,
  name,
  price,
}: ProductCardProps) {
  return (
    <Card>
      <CardContent className="flex w-full flex-col items-center gap-4 pt-4 xl:flex-row">
        <Image
          src={image_url}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-full w-40 rounded-md duration-300 hover:-rotate-2 hover:scale-150"
          style={{
            objectFit: "contain",
          }}
        />
        <div className="w-full">
          <p className="font-bold">{name}</p>
          <p className="text-xs">{description}</p>

          <div className="flex items-center justify-between gap-2 md:mt-3">
            <p className="text-lg font-bold">{formatPrice(price)}</p>
            {/* <Button size="icon" variant="outline" className="bg-gray-900 hover:bg-gray-800">
                      <ShoppingCart color="#fff" />
                  </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
