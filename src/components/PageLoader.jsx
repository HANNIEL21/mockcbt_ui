import Loader from "./Loader";

export default function PageLoader() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader duration={3000} />
    </div>
  );
}
