import { CSSProperties } from "react";

interface UploadPopUpProps {
  progress: number;
  className?: string;
}

export default function UploadPopUp({ progress, className }: UploadPopUpProps) {
  const styles: CSSProperties = {
    width: `${progress}%`,
  }

  return (
    <section
      className={`absolute flex flex-col self-center justify-between
         h-[100px] w-[400px] 
         bg-white shadow-lg rounded-iner-lg py-4 px-4 rounded-md ${className} z-10`}
    >
      <h2 className="text-description">O(s) arquivo(s) estão sendo enviados</h2>
      <div className="flex justify-start w-full py-2 ">
        <span className="border h-full bg-primary text-white px-4" style={styles}>{progress}%</span>
      </div>
    </section>
  );
}
