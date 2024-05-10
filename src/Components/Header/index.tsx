import { Context } from "../../context-provider"
import { useContext } from "react"

export default function Header() {

  const { metricId, setMetricId } = useContext(Context);

  return (
    <div>
      <div id="buttonYandexAuth" />
      <div className=" flex justify-between items-center py-4">
        <input type="text" placeholder="ID метрики" value={metricId} onChange={e => setMetricId(e.target.value)} className="outline-none border-b" />
        <div>
          <a href="#sd" target="_blank">Инструкция</a>
        </div>
      </div>
    </div>)
}