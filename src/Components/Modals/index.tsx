import { Context } from "../../context-provider";
import { useContext } from "react";

export default function Modals() {

  const { modals, setModals } = useContext(Context);

  if (!modals.length) return (<div />);

  return (<div className="fixed z-10 inset-0 bg-[#00000023] flex justify-center items-center" key={"modalsMain"} >
    {modals.map((item: any, index: number) => (
      <div className="bg-white p-4 relative rounded" key={`modals_${index}`}>
        {item}
        <button
          className="bg-yellow-200 text-center rounded py-2 px-2 w-full mt-4"
          onClick={(e) => { setModals((prev: []) => prev.slice(0, prev.length - 1)) }}
        >OK</button>
      </div>
    ))}



  </ div>)

}