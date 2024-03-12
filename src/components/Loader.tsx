import React from "react";
import "./Loder.css";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="centers">
    <div className="rings"></div>
    <div className="imgs">
     <Image
                            className="Images"
                            src="/Metastasis.png"
                            alt={""}
                            width={500}
                            height={500}
                        ></Image>
                    </div>
 </div>
  );
};

export default Loader;