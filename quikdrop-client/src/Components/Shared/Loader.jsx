import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <CircleLoader
        color="#757C81"
        loading={true}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
