import { Context } from "../../context-provider"
import { useContext } from "react"

export default function Header() {

  const { metricId, setMetricId, setYandexToken, yandexToken } = useContext(Context);

  return (<div className=" flex justify-between items-center py-4">
    <div className="w-[150px] h-[50px]">
      <input type="text" placeholder="ID метрики" value={metricId} onChange={e => setMetricId(e.target.value)} className="outline-none border-b" />
      <input type="text" placeholder="AuthO" value={yandexToken} onChange={e => setYandexToken(e.target.value)} className="outline-none border-b" />
    </div>
    <div>
      <a href="#sd" target="_blank">Инструкция</a>
    </div>
  </div>)
}