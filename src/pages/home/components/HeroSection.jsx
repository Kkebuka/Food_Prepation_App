import React from "react";

export default function HeroSection() {
    return(
    <>
    <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative">
          <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-8">
            <div className="py-14 sm:py-20 lg:py-28">
              <div className=" ">
                <h1 className="text-4xl font-extrabold text-center tracking-tight text-white sm:text-4xl md:text-5xl">
                  Home of delicious recipe
                </h1>
                <p className="mt-4 text-base text-gray-100 text-center sm:text-lg">
                Turn cooking into an unforgettable culinary adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    )
}