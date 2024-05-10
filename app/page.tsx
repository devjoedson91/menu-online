import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import ProductCard from "@/components/ui/productCard";
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
      <h2 className="my-9 text-center text-2xl font-bold capitalize md:text-3xl">
        conheça nosso menu
      </h2>
      <div>
        <div className="ounded-lg mx-auto my-6 max-w-7xl rounded-xl bg-red-500 px-2 text-white">
          <h2 className="text-center text-2xl font-bold">Hamburguers</h2>
        </div>
        <main className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-7 px-2 md:grid-cols-2 md:gap-10">
          {products.slice(0, 6).map((product) => {
            return (
              <ProductCard
                key={product.id}
                image_url={product.imageUrl}
                name={product.name}
                price={product.price}
                description={product.description}
              />
            );
          })}
        </main>

        <div className="mx-auto my-6 max-w-7xl rounded-xl bg-red-500 px-2 text-white">
          <h2 className="text-center text-2xl font-bold">Bebidas</h2>
        </div>

        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-7 px-2 md:grid-cols-2 md:gap-10">
          {drinks.slice(0, 6).map((drink) => {
            return (
              <ProductCard
                key={drink.id}
                image_url={drink.imageUrl}
                price={drink.price}
                name={drink.name}
              />
            );
          })}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
