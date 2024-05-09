import ky from "ky"
import React, { SetStateAction, createContext, useEffect, useState } from "react"
import { TokenRootInterface } from "./types/token"
import { UserRootInterface } from "./types/user"
import { Item } from "./Components/Combobox"
import { defaultCompaniesFields } from "./fields/defaultCompanies"
import { defaultContactFields } from "./fields/defaultContacts"
import axios from "axios"
import { ContastantRoot } from "./types/contstants"

interface Account {
  tokenData?: TokenRootInterface
  userData?: UserRootInterface
}
interface Theme {
  account?: Account,
  setAccount: React.Dispatch<React.SetStateAction<any>>,
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>,
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  yandexToken: string,
  setYandexToken: React.Dispatch<React.SetStateAction<string>>,
  options: any
}

// export const Context = createContext<Theme>({
export const Context = createContext<any>({
  account: {},
  setAccount: () => { },
  address: "",
  setAddress: () => { },
  yandexToken: "",
  setYandexToken: () => { },
  token: "",
  setToken: () => { },
  options: {},
  setConstId: () => { },
  constId: "",
  rules: null,
  setRules: () => { },
})

async function init({ setAccount, setAddress, setToken, setOptions, setContactFields, setCompanyFields, setMetricId, setConstId, setYandexToken, setRules }: { setAccount: SetStateAction<any>, setAddress: SetStateAction<any>, setToken: SetStateAction<any>, setOptions: SetStateAction<any>, setContactFields: SetStateAction<any>, setCompanyFields: SetStateAction<any>, setMetricId: SetStateAction<any>, setConstId: SetStateAction<any>, setYandexToken: SetStateAction<any>, setRules: SetStateAction<any> }) {
  let addr
  if (!document.referrer) addr = "https://app.salesap.ru"
  else if (document.referrer.includes("localhost")) addr = "https://app.salesap.ru"
  else addr = document.referrer;


  const url = new URL(window.location.href);
  const _token = url.searchParams.get("token") ?? "4p11jWHiVNuRCRdT8bipoI9OSBkXkMiMo5rRGSENO9o"
  const _options = { headers: { 'Content-Type': 'application/vnd.api+json', 'Authorization': `Bearer ${_token}`, Accept: 'application/vnd.api+json' /*'S2-Allow-Websockets': true */ } }


  setToken(_token);
  setAddress(addr);
  setOptions(_options);

  const getRules = (await axios.get(`${addr}/api/v1/constants?filter[q]=yandexMetrika1.0`, _options)).data.data[0] as ContastantRoot
  if (!getRules) {
    const _constantId = (await axios.post(`${addr}/api/v1/constants`, {
      "data": {
        "type": "constants",
        "attributes": {
          "name": "yandexMetrika1.0",
          "value": "",
          "numeric": false
        }
      }
    }, _options)).data.data.id;

    console.log("Cоздал константу", _constantId)
    setConstId(_constantId)
    return;
  }

  console.log("Беру константу", getRules.id)
  setConstId(getRules.id)

  const regMetricId = /\/\*metricId\*\/(.*)\/\*endMetricId\*\//s;
  const regYandexToken = /\/\*auth0\*\/(.*)\/\*endAuth0\*\//s;
  const regRules = /\/\*rules\*\/(.*)\/\*endRules\*\//s;

  //@ts-ignore
  console.log("Устанавливаю Токен Яндекс", getRules.attributes.value.match(regYandexToken)[1])
  //@ts-ignore
  console.log("Устанавливаю MetrikID", getRules.attributes.value.match(regMetricId)[1])
  //@ts-ignore
  console.log("Маппинг полей", JSON.parse(getRules.attributes.value.match(regRules)[1]))

  //@ts-ignore
  setYandexToken(getRules.attributes.value.match(regYandexToken)?.length ? getRules.attributes.value.match(regYandexToken)[1].replaceAll('"', '') : "");
  //@ts-ignore
  setMetricId(getRules.attributes.value.match(regMetricId)?.length ? getRules.attributes.value.match(regMetricId)[1].replaceAll('"', '') : "");

  //@ts-ignore
  setRules(getRules.attributes.value.match(regRules)?.length ? JSON.parse(getRules.attributes.value.match(regRules)[1]) : "")

  setCompanyFields(defaultCompaniesFields)
  setContactFields(defaultContactFields)


}

function ContextProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [options, setOptions] = useState<any>({})
  const [account, setAccount] = useState<Account>({});
  const [token, setToken] = useState("");
  const [yandexToken, setYandexToken] = useState("");
  const [address, setAddress] = useState("")
  const [contactFields, setContactFields] = useState<Item>()
  const [companyFields, setCompanyFields] = useState<Item>()
  const [metricId, setMetricId] = useState("")
  const [rules, setRules] = useState<any>(null);

  const [constId, setConstId] = useState("")

  useEffect(() => {
    init({ setAccount, setToken, setAddress, setOptions, setContactFields, setCompanyFields, setMetricId, setConstId, setYandexToken, setRules })
  }, [])

  return <Context.Provider value={{ account, setAccount, address, token, setAddress, setToken, options, yandexToken, setYandexToken, contactFields, companyFields, metricId, setMetricId, constId, setConstId, rules, setRules }}>
    {children}
  </Context.Provider>
}

export default ContextProvider;