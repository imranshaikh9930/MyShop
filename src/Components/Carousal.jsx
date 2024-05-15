import React, { useEffect, useState } from 'react';
// import bg1 from "../assets/bannerImgOne";
import bg1 from "../assets/bannerImgOne.jpg";
import bg2 from "../assets/bannerImgTwo.jpg";
import bg3 from "../assets/bannerImgThree.jpg";
import bg4 from "../assets/bannerImgFour.jpg";

const Carousal = () => {
    const [index,setIndex] = useState(0);
    const arr =  [bg1,bg2,bg3,bg4];

    useEffect(()=>{

    const tid = setInterval(()=>{
        handleClick("right");
    },2000)

    return ()=>{
        clearInterval(tid);
    }

    },[index])

    const handleClick = (dir)=>{

        // eslint-disable-next-line react/prop-types
        const lastIndex = arr.length-1
        if(dir === 'left'){
            if(index === 0){
                setIndex(lastIndex);
            }
            else{

                setIndex((prev) => prev - 1 );
            }
        }else if(dir === "right"){
            
            if(lastIndex === index){
                setIndex(0);
            }
            else{

                setIndex((prev) => prev + 1 )
            }
        
        }
    }
  return (
    <div className='flex w-[100vw] items-center -mt-4 md:mt-10  bg-red-500' style={{ scrollBehavior: 'smooth' }}>
    <button onClick={() => handleClick("left")} className='absolute  hidden sm:block  md:top-[35%]  w-[80px] h-[40px] text-3xl md:text-5xl cursor-pointer'>{"<"}</button>
    <img src={arr[index]} alt="" className='max-w-[100%] h-full object-cover mt-[5rem] md:mt-10' />
    <button onClick={() => handleClick("right")} className='absolute hidden sm:block  md:top-[35%] w-[80px] h-[40px] text-3xl md:text-5xl border-none cursor-pointer right-0'>{">"}</button>
</div>


  )
}

export default Carousal