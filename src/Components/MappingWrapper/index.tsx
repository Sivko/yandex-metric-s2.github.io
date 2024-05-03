import { FiPlus } from "react-icons/fi";
import Combobox, { Item } from "../../Components/Combobox";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function FildMapping() {

  const [contactClientID, setContactClientId] = useState(null)
  const [companiesClientID, setCompaniesClientId] = useState(null)

  const [contactsFields, setContactsFields] = useState<Item[]>([])
  const [companiesFields, setCompaniesFields] = useState<Item[]>([])


  return (<div>
    <div className="rounded border relative p-2">
      <h2 className=" absolute bg-white top-[-12px] left-[8px] text-sm">Получение данных</h2>
      <div>
        <div className="flex items-center justify-between">
          <h2>Настройки для Контактов</h2>
          <button className="bg-yellow-200 rounded p-2 opacity-50 hover:opacity-100 transition-opacity" onClick={() => setContactsFields(prev => [...prev, { name: "", value: "пусто" }])}>
            <FiPlus size={21} />
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Combobox placeholder="Поле с ClientID" items={[{ name: "One", value: "value" }]} item={contactClientID} setItem={setContactClientId} />

          {contactsFields.map((item, index) => (<div key={`combo_${index}`} className="flex gap-2 flex-1 w-full">
            <Combobox item={item} items={[{ name: "One", value: "value" }]} setItem={(_item: Item) => setContactsFields((prev) => { let items = prev; contactsFields[index] = _item; return [...items] })} />
            <Combobox item={item} items={[{ name: "One", value: "value" }]} setItem={(_item: Item) => setContactsFields((prev) => { let items = prev; contactsFields[index] = _item; return [...items] })} />
            <button className="px-3 bg-red-400 rounded opacity-50 hover:opacity-100 transition-opacity" onClick={() => setContactsFields(prev => prev.filter((e, idx) => index !== idx))}><FaRegTrashAlt size={15} color="#fff" /></button>
          </div>))}

        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2>Настройки для Компаний</h2>
          <button className="bg-yellow-200 rounded p-2 opacity-50 hover:opacity-100 transition-opacity" onClick={() => setCompaniesFields(prev => [...prev, { name: "", value: "пусто" }])}>
            <FiPlus size={21} />
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Combobox placeholder="Поле с ClientID" items={[{ name: "One", value: "value" }]} item={companiesClientID} setItem={setCompaniesClientId} />

          {companiesFields.map((item, index) => (<div key={`combo_${index}`} className="flex gap-2 flex-1 w-full">
            <Combobox item={item} items={[{ name: "One", value: "value" }]} setItem={(_item: Item) => setCompaniesFields((prev) => { let items = prev; contactsFields[index] = _item; return [...items] })} />
            <Combobox item={item} items={[{ name: "One", value: "value" }]} setItem={(_item: Item) => setCompaniesFields((prev) => { let items = prev; contactsFields[index] = _item; return [...items] })} />
            <button className="px-3 bg-red-400 rounded opacity-50 hover:opacity-100 transition-opacity" onClick={() => setCompaniesFields(prev => prev.filter((e, idx) => index !== idx))}><FaRegTrashAlt size={15} color="#fff" /></button>
          </div>))}

        </div>
      </div>
    </div>
  </div>)
}