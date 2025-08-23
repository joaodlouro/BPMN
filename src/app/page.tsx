import BpmnEditor from "./Components/BpmnEditor";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center gap-6"
      style={{
        backgroundImage: "url('/city.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <BpmnEditor />


      <Image
        className="absolute bottom-0 left-0  translate-y-[-5px]"
        src="/dark.png"
        alt="soldado"
        width={400}
        height={500}
      />
    </div>
  );
}
