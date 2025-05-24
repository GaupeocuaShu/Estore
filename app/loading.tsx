import Image from "next/image";
import loader from "@/assets/loader.gif";
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Image src={loader} alt="loading" width={100} height={100} />
      </div>
    </div>
  );
};

export default Loading;
