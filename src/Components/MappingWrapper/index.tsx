import { FiPlus } from "react-icons/fi";
import Combobox, { Item } from "../../Components/Combobox";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { yandexGroupFields } from "../../fields/yandexGroup";
import { Context } from "../../context-provider";

const metrics = ["ym:s:visits", "ym:pv:pageviews", "ym:ad:visits", "ym:up:params", "ym:ev:expenseClicks"];


export default function FildMapping() {
  // test
  const { contactFields, companyFields, yandexToken, metricId, address, rules, setRules, contactClientID, setContactClientId, companiesClientID, setCompaniesClientId, result, setRusult } = useContext(Context);

  interface Fields {
    yandexField: Item
    crmField: Item
  }

  const [contactsSelectedFields, setContactsSelectedFields] = useState<Fields[]>([])
  const [companiesSelectedFields, setCompaniesSelectedFields] = useState<Fields[]>([])

  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {

    if (rules && rules?.contactRules?.length) {
      setContactsSelectedFields([].concat.apply([], rules?.contactRules.map((e: any) => e.params)))
      setContactClientId(rules.contactRules[0].clientId)
    }

    if (rules && rules?.companyRules?.length) {
      setCompaniesSelectedFields([].concat.apply([], rules?.companyRules.map((e: any) => e.params)))
      setCompaniesClientId(rules.companyRules[0].clientId)
    }

  }, [rules])

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
    const metricId = /*metricId*/"${metricId}"/*endMetricId*/;;
    const auth0 = /*auth0*/"${yandexToken}"/*endAuth0*/;
    const rules = /*rules*/${rules}/*endRules*/;
    
    if (request.type != "Contact" && request.type != "Company") { throw new Error("Ожидается хук с Контактом или Компанией") };
    if (request.type == "Contact") {
      newData.type = "contacts";
      if (!rules.contactRules.length) { throw new Error("Не удалось найти правила для Контактов") };
      for (let i = 0; i < rules.contactRules.length; i++) {
        if (!data[rules.contactRules[i].clientId["attribute-name"]]) throw new Error("Поле" + rules.contactRules[i].clientId["attribute-name"] + " не найдено")
        const clientId = data[rules.contactRules[i].clientId["attribute-name"]].replace(/<(.|)*?>/g, '');
        if (!clientId) {throw new Error ("Не указан ClientID")}
        const dimensions = rules.contactRules[i].params.map(e => e.yandexField["attribute-name"]).join(",");
        const url = "https://api-metrika.yandex.net/stat/v1/data?ids=" + metricId + "&dimensions=" + dimensions + "&filters=ym:s:clientID=="+clientId+"&metrics=" + rules.contactRules[i].metric+"&date1="+moment(data.created_at, "DD.MM.YYYY hh:mm:ss").format("YYYY-MM-DD");
        const res = await axios.get(url, { headers: { Authorization: "OAuth " + auth0 } })
        if (!res.data.data?.length) { throw new Error("Нет данных для записи" + JSON.stringify(res.data)) }
          for (let x = 0; x < rules.contactRules[i].params.length; x++) {
            if (rules.contactRules[i].params[x].crmField["attribute-name"].includes("custom")) {
              newData.attributes.customs[rules.contactRules[i].params[x].crmField["attribute-name"]]
              } else { newData.attributes[rules.contactRules[i].params[x].crmField["attribute-name"]] = res.data.data[0].dimensions[x].name; }
          }
          await axios.patch("${address}/api/v1/contacts/"+data.id, {data: newData}, options);
        }
      return;
    }

    if (request.type == "Company") {
      newData.type = "companies";
      if (!rules.companyRules.length) { throw new Error("Не удалось найти правила для Контактов") };
      for (let i = 0; i < rules.companyRules.length; i++) {
        if (!data[rules.companyRules[i].clientId["attribute-name"]]) throw new Error("Поле" + rules.companyRules[i].clientId["attribute-name"] + " не найдено")
        const clientId = data[rules.companyRules[i].clientId["attribute-name"]].replace(/<(.|)*?>/g, '');
        if (!clientId) {throw new Error ("Не указан ClientID")}
        const dimensions = rules.companyRules[i].params.map(e => e.yandexField["attribute-name"]).join(",");
        const url = "https://api-metrika.yandex.net/stat/v1/data?ids=" + metricId + "&dimensions=" + dimensions + "&filters=ym:s:clientID=="+clientId+"&metrics=" + rules.companyRules[i].metric+"&date1="+moment(data.created_at, "DD.MM.YYYY hh:mm:ss").format("YYYY-MM-DD");
        const res = await axios.get(url, { headers: { Authorization: "OAuth " + auth0 } })
        if (!res.data.data?.length) { throw new Error("Нет данных для записи" + JSON.stringify(res.data)) }
          for (let x = 0; x < rules.companyRules[i].params.length; x++) {
            if (rules.companyRules[i].params[x].crmField["attribute-name"].includes("custom")) {
              newData.attributes.customs[rules.companyRules[i].params[x].crmField["attribute-name"]]
              } else { newData.attributes[rules.companyRules[i].params[x].crmField["attribute-name"]] = res.data.data[0].dimensions[x].name; }
          }
          await axios.patch("${address}/api/v1/companies/"+data.id, {data: newData}, options);
        }
      return;
    }

    
  `

    setRusult(someCode)

  }, [contactsSelectedFields, companiesSelectedFields, contactClientID, companiesClientID, setRules, metricId, yandexToken, rules, address, metrics])

  return (<div>
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
          <Combobox key={contactClientID.name} placeholder="Поле с ClientID" items={contactFields} item={contactClientID} setItem={setContactClientId} />

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
          <Combobox key={companiesClientID.name} placeholder="Поле с ClientID" items={companyFields} item={companiesClientID} setItem={setCompaniesClientId} />

          {companiesSelectedFields.map((item, index) => (<div key={`combo2_${index}`} className="flex gap-2 flex-1 w-full">
            <Combobox placeholder="Поле в СРМ" item={item.crmField} items={companyFields} setItem={(_item: Item) => setCompaniesSelectedFields((prev) => { let items = prev; companiesSelectedFields[index].crmField = _item; return [...items] })} />
            <Combobox placeholder="Поле в Метрике" item={item.yandexField} items={yandexGroupFields} setItem={(_item: Item) => setCompaniesSelectedFields((prev) => { let items = prev; companiesSelectedFields[index].yandexField = _item; return [...items] })} />
            <button className="px-3 bg-red-400 rounded opacity-50 hover:opacity-100 transition-opacity" onClick={() => setCompaniesSelectedFields(prev => prev.filter((e, idx) => index !== idx))}><FaRegTrashAlt size={15} color="#fff" /></button>
          </div>))}

        </div>
      </div>
    </div>

    <div className="flex items justify-end">
      <div className="w-[12px] h-[12px] cursor-pointer" onClick={() => setIsAdmin(prev => !prev)} />
    </div>
    {isAdmin && <pre className="text-[10px] leading-[10px]" key={"CODE"}>
      {result}
    </pre>}
  </div>)
}