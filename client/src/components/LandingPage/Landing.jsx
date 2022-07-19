import React from "react";

import landing from "../LandingPage/landing.module.css";
import nftData from "../LandingPage/SliderNftData";
import EmblaCarousel from "./Carousel/EmblaCarousel";

const SLIDE_COUNT = nftData.length;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const Landing = () => {
  return (
      <div>

        
        <div className={`${landing.limitH} flex flex-col  max-w-screen-xl w-screen max-w-screen-xl `}>
    
        <div className=" m-2 flex flex-start max-h-24 max-w-fit">
          <img className="object-cover" src='https://raw.githubusercontent.com/RQuirogaH/MarAbierto-Marketplace/US2_Home_Page/client/src/assests/LogoPMA.png' alt='logo'></img>
        </div>

        <div className="flex w-full justify-center content-center">
          <h1 className="font-mono text-6xl text-cyan-500	 ">Mar</h1>
          <h1 className="font-mono text-6xl text-amber-600 mx-8 ">Abierto</h1>

          <div className=" flex place-self-center">
            <h1 className="font-mono text-4xl self-auto text-neutral-400	" > - NFT MARKETPLACE</h1>

          </div>

          
        </div>

        <div className="flex flex-row w-full justify-center">
          <div className="basis-5/12 m-11" >
           <EmblaCarousel slides={slides}/>
          </div>

          <div className="basis-5/12 m-11 flex flex-col items-center">
            <p className="p-10 py-20 w-12/12 text-4xl text-neutral-200">NFT's are designed to give you something that can't be copied.</p> 
            <button className="p-4 w-fit bg-amber-600 text-5xl">EXPLORE</button>
          </div>
        </div>
      

        
      </div>
    </div>

  );
};

export default Landing;