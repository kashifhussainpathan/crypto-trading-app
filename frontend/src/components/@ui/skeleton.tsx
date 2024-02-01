import { FC } from "react";

interface ISkeleton {
  className?: string;
}

const Skeleton: FC<ISkeleton> = ({ className }) => {
  return <div className={`bg-gray-300 animate-pulse ${className} `} />;
};

export default Skeleton;
