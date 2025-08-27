import { Link } from "react-router-dom";

export default function CategoryCard({ name, image, rounded = "rounded-xl" }) {
  return (
    <Link
      to={`/category/${name}`}
      className={`group relative card w-full bg-base-100 ${rounded} overflow-hidden transition-transform duration-300 hover:-translate-y-2`}
    >
      {/* Image */}
      <figure className="w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </figure>

      {/* Overlay Content (no unstable gradient) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-3 sm:p-2 flex flex-col justify-end">
        <div className="text-white">
          <h3 className="text-lg sm:text-xl font-bold font-fredoka group-hover:text-orange-500 transition-colors">
            {name}
          </h3>

          <div className="flex items-center space-x-2 text-xs sm:text-sm font-inter font-medium">
            <span>View Meals</span>
            <span className="inline-block text-2xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
