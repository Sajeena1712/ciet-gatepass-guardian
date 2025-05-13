
import { useEffect, useState } from "react";
import { bannerImages } from "@/lib/mockData";

const Banner = () => {
  const [imageList, setImageList] = useState<string[]>([]);
  
  useEffect(() => {
    // Double the images to create a seamless loop
    setImageList([...bannerImages, ...bannerImages]);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="banner-scroll">
        <div className="banner-scroll-inner flex">
          {imageList.map((src, index) => (
            <img 
              key={index}
              src={src} 
              alt={`Hostel Facility ${index + 1}`}
              className="banner-image object-cover rounded-md"
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none"></div>
    </div>
  );
};

export default Banner;
