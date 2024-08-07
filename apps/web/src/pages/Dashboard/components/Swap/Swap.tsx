import { useEffect } from 'react'
import { createSwapy } from 'swapy'

import { getItemById, ItemId } from './Item'

const DEFAULT: Record<string, ItemId> = {
  '1': 'deposits-and-withdrawals',
  '2': 'investments-icome',
  '3': 'd',
  '4': 'e',
}

export function Swap() {
  const storedItems = localStorage.getItem('slotItem')
  const slotItems: Record<string, ItemId> = storedItems
    ? JSON.parse(storedItems)
    : DEFAULT

  useEffect(() => {
    const container = document.querySelector('.swapy-container')

    if (container) {
      const swapy = createSwapy(container)

      swapy.onSwap((event: any) => {
        const updatedItems: Record<string, ItemId> = {}
        for (const key in event.data.object) {
          if (Object.prototype.hasOwnProperty.call(event.data.object, key)) {
            const value = event.data.object[key]
            updatedItems[key] = value
          }
        }
        localStorage.setItem('slotItem', JSON.stringify(updatedItems))
      })

      swapy.onSwap((event) => {
        console.log(event.data.object)
        console.log(event.data.array)
        console.log(event.data.map)
      })
    }
  }, [])

  return (
    <div className="swapy-container grid h-[250px] w-full grid-cols-3 gap-4">
      <div
        className="col-span-1 cursor-grab rounded-lg bg-zinc-300"
        data-swapy-slot="1"
      >
        {getItemById(slotItems['1'])}
      </div>
      <div
        className="col-span-2 cursor-grab rounded-lg bg-zinc-300"
        data-swapy-slot="2"
      >
        {getItemById(slotItems['2'])}
      </div>
      <div
        className=" col-span-2 cursor-grab rounded-lg bg-zinc-300"
        data-swapy-slot="3"
      >
        {getItemById(slotItems['3'])}
      </div>
      <div
        className="col-span-1 cursor-grab rounded-lg bg-zinc-300"
        data-swapy-slot="4"
      >
        {getItemById(slotItems['4'])}
      </div>
    </div>
  )
}
