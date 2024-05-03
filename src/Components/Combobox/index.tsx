import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

export interface Item {
  name: string
  id?: string,
  "attribute-name"?: string,
  type?: string
  recorded?: string
  value?: string
}

function Combobox({ items = [], item, setItem, placeholder }: { items: Item[] | null, item: Item | null, setItem: any, placeholder?: string }) {

  const [inputValue, setInputValue] = useState(item ? item.name : "")
  const [isShowList, setIsShowList] = useState(false);
  const [filterElements, setFilterElements] = useState(items);
  // https://app.salesap.ru/api/v1/deals/ids?filter[table-state-id]=2589138
  const comboboxRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!items) return
    if (inputValue) setFilterElements(items.filter((e) => e.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())))
    else setFilterElements(items)
  }, [inputValue])

  const keyPressToSelect = (e: KeyboardEvent<HTMLInputElement>) => {

  }

  function hideList(e: MouseEvent) {
    const componentElement = comboboxRef.current
    if (!componentElement) return;
    if (e.target === componentElement || componentElement.contains(e.target as HTMLElement)) { }
    else { setIsShowList(false) }
  }

  useEffect(() => {
    document.addEventListener("mousedown", hideList)
    return () => document.removeEventListener('mousedown', hideList)
  }, [])

  // filterElements

  return (<>
    <div className="relative w-full" ref={comboboxRef}>
      <input type="text"
        // onKeyDown={(e) => { setIsShowList(true); keyPressToSelect(e) }}
        className="py-2 px-2 border border-outline border-solid rounded outline-none w-full"
        value={inputValue}
        placeholder={placeholder}
        onClick={() => setIsShowList(prev => { setFilterElements(items); return !prev })}
        onChange={(e) => { setInputValue(e.target.value); }}
      />
      <div className={`absolute mt-2 top-full animate-fade animate-duration-[100ms] border border-solid border-outline bg-white w-full rounded max-h-[250px] overflow-y-scroll p-2 z-10 ${isShowList ? "" : "hidden"}`}>
        {filterElements && filterElements.length > 0 && filterElements
          .map((e, index) => (<div
            key={index}
            onClick={() => { setItem(e); setInputValue(e.name); setIsShowList(false); }}
            className={`py-2 px-1 rounded border-b overflow-hidden border-solid border-white border-b-outline cursor-pointer ${item && item["attribute-name"] === e["attribute-name"] ? "bg-[#d1d1d1]" : ""}`}
          >
            {e.name}
          </div>
          ))}
        {filterElements && filterElements.length === 0 && <div
          className="py-2 px-1 text-center">Ничего не найдено</div>}
      </div>
      <div className="absolute top-[-8px] left-2 text-[10px] bg-white text-gray-400">{item?.name ? item["attribute-name"] : "не выбрано"}</div>
    </div>
  </>)
}

export default Combobox