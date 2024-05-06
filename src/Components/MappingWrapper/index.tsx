import { FiPlus } from "react-icons/fi";
import Combobox, { Item } from "../../Components/Combobox";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { yandexGroupFields } from "../../fields/yandexGroup";
// import { defaultCompaniesFields } from "../../fields/defaultCompanies";
// import { defaultContactFields } from "../../fields/defaultContacts";
import { Context } from "../../context-provider";

export default function FildMapping() {

  const { contactFields, companyFields, yandexToken, metricId } = useContext(Context);

  interface Fields {
    yandexField: Item
    crmField: Item
  }

  const metrics = ["ym:s:visits", "ym:pv:pageviews", "ym:ad:visits", "ym:up:params", "ym:ev:expenseClicks"];

  const [contactClientID, setContactClientId] = useState<Item>({ name: "" })
  const [companiesClientID, setCompaniesClientId] = useState<Item>({ name: "" })

  const [contactsSelectedFields, setContactsSelectedFields] = useState<Fields[]>([])
  const [companiesSelectedFields, setCompaniesSelectedFields] = useState<Fields[]>([])

  const [rules, setRules] = useState<any>(null);
  const [result, setRusult] = useState<any>(null);

  const [clientID, setClientID] = useState("1713166098593675470");

  useEffect((): any => {

    const contactRules = contactsSelectedFields
      .filter((item) => item.crmField["attribute-name"] && item.yandexField["attribute-name"])
      .map((item) => item.yandexField["attribute-name"])
      .map((item) => `:${item?.split(":")[1]}:`)
      .filter((item, i, ar) => ar.indexOf(item) === i)
      .map((item) => ({
        clientId: contactClientID,
        params: contactsSelectedFields.filter((e) => e.yandexField["attribute-name"]?.includes(item)),
        metric: metrics.filter(e => e.includes(item))[0]
      }))

    const companyRules = companiesSelectedFields
      .filter((item) => item.crmField["attribute-name"] && item.yandexField["attribute-name"])
      .map((item) => item.yandexField["attribute-name"])
      .map((item) => `:${item?.split(":")[1]}:`)
      .filter((item, i, ar) => ar.indexOf(item) === i)
      .map((item) => ({
        clientId: companiesClientID,
        params: companiesSelectedFields.filter((e) => e.yandexField["attribute-name"]?.includes(item)),
        metric: metrics.filter(e => e.includes(item))[0]
      }))


    setRules(JSON.stringify({ contactRules, companyRules }))

    const someCode = `
    const metricId = "${metricId}";
    const auth0 = "${yandexToken}";
    const rules = /*rules*/${rules}/*endRules*/;
    if (request.type != "Contact" && request.type != "Company") {throw new Error("Ожидается хук с Контактом или Компанией")};
    if (request.type == "Contact") {
      if (!rules.contactRules.length) {throw new Error("Не удалось найти правила для Контактов")};
      for (let i=0;i<rules.contactRules.length;i++) {
          const dimensions = rules.contactRules[i].params.map(e=>e.yandexField["attribute-name"]).join(",");
          const url = "https://api-metrika.yandex.net/stat/v1/data?ids="+metricId+"&dimensions="+dimensions+"&filters=ym:s:clientID==${clientID}&metrics="+rules.contactRules[i].metric;
          const res = axios.get(url, {headers: {Authorization: "OAuth ${yandexToken}"}})
          if (!res.data?.length) {throw new Error("Нет данных для записи" + JSON.stringify(res))}
          for (let x = 0; x < rules.contactRules[i].params.length; x++) {
            newData.attributes[rules.contactRules[i].params[x].crmField["attribute-name"]] = res.data[0].dimensions[x].name;
          }
          newData.type = "contacts";
          //await axios.patch("https://app.salesap.ru/contacts/"+data.id,options);
          console.log(newData)

      }      
    }
    
  `

    setRusult(someCode)

  }, [contactsSelectedFields, companiesSelectedFields, contactClientID, companiesClientID])

  return (<div>
    <input value={clientID} onChange={e => setClientID(e.target.value)} />
    <div className="rounded border relative p-2">
      <h2 className=" absolute bg-white top-[-12px] left-[8px] text-sm">Получение данных</h2>
      <div>
        <div className="flex items-center justify-between">
          <h2>Настройки для Контактов</h2>
          <button className="bg-yellow-200 rounded p-2 opacity-50 hover:opacity-100 transition-opacity" onClick={() => setContactsSelectedFields(prev => [...prev, { yandexField: { name: "" }, crmField: { name: "" } }])}>
            <FiPlus size={21} />
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Combobox placeholder="Поле с ClientID" items={contactFields} item={contactClientID} setItem={setContactClientId} />

          {contactsSelectedFields.map((item, index) => (<div key={`combo_${index}`} className="flex gap-2 flex-1 w-full">
            <Combobox placeholder="Поле в СРМ" item={item.crmField} items={contactFields} setItem={(_item: Item) => setContactsSelectedFields((prev) => { let items = prev; contactsSelectedFields[index].crmField = _item; return [...items] })} />
            <Combobox placeholder="Поле в Метрике" item={item.yandexField} items={yandexGroupFields} setItem={(_item: Item) => setContactsSelectedFields((prev) => { let items = prev; contactsSelectedFields[index].yandexField = _item; return [...items] })} />
            <button className="px-3 bg-red-400 rounded opacity-50 hover:opacity-100 transition-opacity" onClick={() => setContactsSelectedFields(prev => prev.filter((e, idx) => index !== idx))}><FaRegTrashAlt size={15} color="#fff" /></button>
          </div>))}

        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2>Настройки для Компаний</h2>
          <button className="bg-yellow-200 rounded p-2 opacity-50 hover:opacity-100 transition-opacity" onClick={() => setCompaniesSelectedFields(prev => [...prev, { yandexField: { name: "" }, crmField: { name: "" } }])}>
            <FiPlus size={21} />
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Combobox placeholder="Поле с ClientID" items={companyFields} item={companiesClientID} setItem={setCompaniesClientId} />

          {companiesSelectedFields.map((item, index) => (<div key={`combo2_${index}`} className="flex gap-2 flex-1 w-full">
            <Combobox placeholder="Поле в СРМ" item={item.crmField} items={companyFields} setItem={(_item: Item) => setCompaniesSelectedFields((prev) => { let items = prev; companiesSelectedFields[index].crmField = _item; return [...items] })} />
            <Combobox placeholder="Поле в Метрике" item={item.yandexField} items={yandexGroupFields} setItem={(_item: Item) => setCompaniesSelectedFields((prev) => { let items = prev; companiesSelectedFields[index].yandexField = _item; return [...items] })} />
            <button className="px-3 bg-red-400 rounded opacity-50 hover:opacity-100 transition-opacity" onClick={() => setCompaniesSelectedFields(prev => prev.filter((e, idx) => index !== idx))}><FaRegTrashAlt size={15} color="#fff" /></button>
          </div>))}

        </div>
      </div>
    </div>
    <pre className="text-[10px] leading-[10px]">
      {result}
    </pre>
  </div>)
}