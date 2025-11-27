import Lottie from "lottie-react";
import Nopageanimation from "../assets/animated icons/404-Aimation.json";

const Nopage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mt-10">
        <Lottie animationData={Nopageanimation} />
      </div>
    </div>
  );
};

export default Nopage;
