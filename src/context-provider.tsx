import ky from "ky"
import React, { SetStateAction, createContext, useEffect, useState } from "react"
import { TokenRootInterface } from "./types/token"
import { UserRootInterface } from "./types/user"
import { Item } from "./Components/Combobox"
import { defaultCompaniesFields } from "./fields/defaultCompanies"
import { defaultContactFields } from "./fields/defaultContacts"

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
  options: {}
})

async function init({ setAccount, setAddress, setToken, setOptions, setContactFields, setCompanyFields, setMetricId }: { setAccount: SetStateAction<any>, setAddress: SetStateAction<any>, setToken: SetStateAction<any>, setOptions: SetStateAction<any>, setContactFields: SetStateAction<any>, setCompanyFields: SetStateAction<any>, setMetricId: SetStateAction<any> }) {
  // const account = await chrome.storage.local.get(["account"])
  // const address = await chrome.storage.local.get(["address"])
  // const token = await chrome.storage.local.get(["token"])
  // const options = await chrome.storage.local.get(["options"])

  // setAccount(account.account ?? {})
  // console.log("account.account", account.account,)
  // setAddress(address?.address == "" ? "https://app.salesap.ru" : address?.address)
  // setToken(token.token ?? "")
  // setOptions(options.options ?? {})

  setCompanyFields(defaultCompaniesFields)
  setContactFields(defaultContactFields)
}

async function updateAddressAndToken({ address, token, setAccount, setOptions, setFlagUpdate, flagUpdate }: { address: string, token: string, setAccount?: SetStateAction<any>, setOptions: SetStateAction<any>, setTest?: SetStateAction<any>, flagUpdate: boolean, setFlagUpdate: SetStateAction<any>, setMetricId: SetStateAction<any> }) {
  try {
    if (flagUpdate) {
      // chrome.storage.local.set({ "account": {} })
      setAccount(() => ({}))
      const options = {
        withCredentials: false,
        credentials: "omit",
        headers: { 'Content-Type': 'application/vnd.api+json', 'Authorization': `Bearer ${token}`, Accept: 'application/vnd.api+json' /*'S2-Allow-Websockets': true */ },
      };
      //@ts-ignore
      const tokenData: TokenRootInterface = await ky.get(`${address}/api/v1/current-token`, options).json();
      //@ts-ignore
      const userData: UserRootInterface = await ky.get(`${address}/api/v1/users/${tokenData.data.attributes["user-id"]}?include=account`, options).json();
      // chrome.storage.local.set({ "account": { tokenData, userData } })
      setAccount({ tokenData, userData })
      // chrome.storage.local.set({ "options": options })
      setOptions(options)
    }
    setFlagUpdate(true);
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      const errorJson = await error.response.json();
      // setTest(JSON.stringify(errorJson))
    }
  }
}

function ContextProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [options, setOptions] = useState<any>({})
  const [account, setAccount] = useState<Account>({});
  const [token, setToken] = useState("");
  const [yandexToken, setYandexToken] = useState("y0_AgAEA7qj6qHpAAuXoQAAAAEBZYiyAADyDOxDvFdHcaQlMZcAJ6RjK04nEA");
  const [address, setAddress] = useState("")
  const [contactFields, setContactFields] = useState<Item>()
  const [companyFields, setCompanyFields] = useState<Item>()
  const [metricId, setMetricId] = useState("37176535")
  // const [test] = useState("")
  const [flagUpdate, setFlagUpdate] = useState(false)

  useEffect(() => {
    init({ setAccount, setToken, setAddress, setOptions, setContactFields, setCompanyFields, setMetricId })
  }, [])

  useEffect(() => {
    if (token) {
      updateAddressAndToken({ address, token, setOptions, setFlagUpdate, flagUpdate, setAccount, setMetricId })
    }

  }, [token, address])

  return <Context.Provider value={{ account, setAccount, address, token, setAddress, setToken, options, yandexToken, setYandexToken, contactFields, companyFields, metricId, setMetricId }}>
    {children}
  </Context.Provider>
}

export default ContextProvider;