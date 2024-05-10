import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import ProductCard from "@/components/ui/productCard";
import Refri1 from "@/public/refri-1.png";
import Refri2 from "@/public/refri-2.png";
import { prismaClient } from "@/lib/prisma";

export default async function Home() {

  const products = await prismaClient.product.findMany({
    where: {
      categoryId: "78869090-6c67-4533-bee0-26fa6f5c0f40",
    },
  });

  const drinks = await prismaClient.product.findMany({
    where: {
      categoryId: "9a740114-2b9d-49c0-841a-4133e10aa64a",
    },
  });

  if (!products || !drinks) return null;

  return (
    <>
      <Header />
      <h2 className="capitalize md:text-3xl text-2xl font-bold text-center mt-9 mb-6">conheça nosso menu</h2>
      <div>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16">
          {
            products.slice(0, 4).map(product => {

              return (
                <ProductCard 
                  key={product.id} 
                  image_url={product.imageUrl} 
                  name={product.name} 
                  price={product.price} 
                  description={product.description}  
                />
              )
            })
          }
        </main>

        <div className="mx-auto max-w-7xl px-2 my-2">
          <h2 className="font-bold text-3xl">Bebidas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16">
          {
            drinks.slice(0, 6).map(drink => {
              return (
                <ProductCard key={drink.id} image_url={drink.imageUrl} price={drink.price} name={drink.name} />
              )
            })
          }

        </div>
      </div>
      <Footer />
    </>
  );
}
