import { useSelector } from "react-redux";
import { IAssetsState } from "../models/assets.type";

const useGetAssetsState = () => {
  return useSelector(({ assets }: { assets: IAssetsState }) => assets);
};

export default useGetAssetsState;
