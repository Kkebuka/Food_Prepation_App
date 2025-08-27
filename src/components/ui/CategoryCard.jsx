import { Link } from "react-router-dom";

export default function CategoryCard({ name, image, productCount }) {
  return (
    <Link
      to={`/category/${name}`}
      className="group relative card w-full bg-base-100 rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Image */}
      <figure className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </figure>

      {/* Overlay Content */}
      <div className="absolute bottom-0 left-0 right-0 sm:h-[45%] lg:h-[38%] bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
        <div className="text-white space-y-1">
          <h3 className="text-xl font-bold font-fredoka group-hover:text-primary transition-colors">
            {name}
          </h3>
          {/* <p className="text-sm font-inter opacity-90">{productCount} products</p> */}

          <div className="flex items-center space-x-2 text-sm font-inter font-medium">
            <span>Shop Now</span>
            {/* Tailwind arrow instead of react-icons */}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-primary/30 transition-colors duration-300 pointer-events-none"></div>
    </Link>
  );
}
