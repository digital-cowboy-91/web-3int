import { BarLoader } from "react-spinners";
import config from "@/tailwind.config";

const Loader = () => {
  return (
    // @ts-expect-error
    <BarLoader color={config.theme?.colors?.grey.DEFAULT} />
  );
};

export default Loader;
