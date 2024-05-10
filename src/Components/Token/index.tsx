import { Context } from "../../context-provider"
import { useContext } from "react"
import { IoExitOutline } from "react-icons/io5";

export default function Token() {

  const { token, setToken, yandexToken, setYandexToken, address } = useContext(Context)

  return (<>
    <div className="rounded border relative p-2 mb-4">
      <h2 className=" absolute bg-white top-[-12px] left-[8px] text-sm">Токены</h2>
      <div className="flex gap-2 mb-2">
        <div className="w-[117px]">CRM</div>
        <input className="outline-none border-b flex-1" value={token} onChange={e => setToken(e.target.value)} />
        <a href={`${address}/settings?mode=api_keys%3Aindex&tab=`} target="_blank" className="w-[25px] flex items-center justify-center rounded bg-yellow-200 opacity-50 hover:opacity-100 transition-opacity" rel="noreferrer"><IoExitOutline size={15} /></a>
      </div>
      <div className="flex gap-2">
        <div className="w-[117px]">Yandex Auth0</div> <input id="yatoken" className="outline-none border-b flex-1" value={yandexToken} onChange={e => setYandexToken(e.target.value)} />
      </div>
    </div>
  </>)
}