import Link from "next/link";
import React from "react";

const Products = (props) => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto">
          <div className="flex flex-wrap w-full md:mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Product List - MyShop
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {props?.products?.data?.map((item) => {
              return (
                <div key={item.attributes.slug} className="xl:w-1/4 md:w-1/2 p-4">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <img
                      className="h-96 rounded m-auto mb-8"
                      src={`http://192.168.2.183:1337${item.attributes.image.data.attributes.url}`}
                      alt="content"
                    />
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                      {item.attributes.category}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {item.attributes.title}
                    </h2>
                    <div className="hidden bg-red-800 bg-purple-800 bg-green-800 bg-black-800 bg-blue-800 bg-yellow-800 bg-white-800"></div>
                    <button className={"border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none " + `bg-${item.attributes.color}-800`}></button>
                    <p className="leading-relaxed text-base" >
                      {item.attributes.description.substring(0,70)}...
                    </p>
                    <Link href={`/product/${item.attributes.slug}`}>
                    <button className="my-2 text-white bg-indigo-500 border-0 py-1 md:py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">Buy Now</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  let data = await fetch("http://localhost:1337/api/products?populate=*", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer d3ff64fc5bf73d352f6081ea5efa5eebd195c5dcda8d0e913ff6043e4bca3fbedf8923f9c0125e5c4af2ce4b229cf720669eac9c366d6c2b23f85cdb90fe3a4168b9c6e35e565bd9441b2cca0d0e783d49df606cb623109c16953d572e3a23ae2d1e4fa3f86e9397f90d2b6eca2ab88fefb34695bfe8e30a06b4d346229f3c62",
    },
  });
  let products = await data.json();
  return {
    props: { products },
  };
}

export default Products;
