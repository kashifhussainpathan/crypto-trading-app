import { useMemo } from "react";
import Skeleton from "../@ui/skeleton";

const CoinsLoader = () => {
  const loaderArray = useMemo(
    () => Array.from({ length: 20 }, (_, i: number): number => i + 1),
    []
  );

  return (
    <>
      {loaderArray.map((count) => (
        <tr className="border" key={count}>
          <td className="pl-3 py-1 flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div>
              <Skeleton className="h-4 w-28 mb-[1px] pr-4" />
              <Skeleton className="h-2 w-8" />
            </div>
          </td>
          <td>
            <Skeleton className="h-4 w-20" />
          </td>
          <td>
            <Skeleton className="h-4 w-20 pl-8" />
          </td>
          <td>
            <Skeleton className="h-6 w-5 pl-8" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default CoinsLoader;
