import axios from "axios";
import { Context } from "../../context-provider"
import { useContext } from "react"

export default function Save() {


  const { result, rules, options, address, constId, setModals, token } = useContext(Context);

  async function saveHandler() {
    console.log(rules)
    try {
      const data = {
        data: {
          type: "constants",
          id: constId,
          attributes: { value: result }
        }
      }

      await axios.patch(`${address}/api/v1/constants/${constId}`, data, options);
      setModals((prev: []) => [...prev, (<>
        <h1 className="text-xl font-bold">Вcе ОК :)</h1>
        <div>Теперь необходимо вызвать вебхук из контакта/компании для отработки скрипта</div>
        <div><input type="text" className="outline-none border-b w-full" value={`https://vs113.ru/api/v2/${constId}/${token}/${address.replace("https://", "")}`} /></div>
      </>)])
    } catch (err) {
      setModals((prev: []) => [...prev, (<>
        <h1>Что-то пошло не так :( </h1>
        <span>Подробнее в консоли</span>
      </>)])
      console.log(err)
    }
  }

  return (<div>
    <button onClick={saveHandler} className="bg-yellow-200 text-center rounded py-2 px-2 w-full mt-4">Сохранить</button>
  </div>)
}