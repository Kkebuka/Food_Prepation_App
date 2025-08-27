import { Link } from "react-router-dom";

export default function CategoryCard({ name, image, rounded = "rounded-xl" }) {
  return (
    <Link
      to={`/category/${name}`}
      className={`group relative card w-full bg-base-100 ${rounded} overflow-hidden transition-transform duration-300 hover:-translate-y-2`}
    >
      {/* Image */}<div className="relative h-48 rounded-lg overflow-hidden shadow-md cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105"
      />
      <div className="absolute bottom-0 w-full bg-gray-900/30  text-white p-2">
        <h3 className="text-lg font-semibold group-hover:text-orange-500">{name}</h3>
        <div className="flex items-center"> 
          <p className="text-sm">View meals </p>
          <p className=" text-2xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </p> </div>
       
      </div>
    </div>


      {/* <figure className="w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </figure> */}

      {/* Overlay Content (no unstable gradient) */}
      {/* <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-3 sm:p-4 flex flex-col justify-end">
        <div className="text-white">
          <h3 className="text-lg sm:text-xl font-bold font-fredoka group-hover:text-orange-500 transition-colors">
            {name}
          </h3>

          <div className="flex items-center space-x-2 text-xs sm:text-sm font-inter font-medium">
            <span>Shop Now</span>
            <span className="inline-block text-2xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div> */}
    </Link>
  );
}
