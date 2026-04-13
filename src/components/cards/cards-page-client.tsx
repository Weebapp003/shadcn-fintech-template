"use client"

import { useState, useCallback } from "react"
import { cardsData, type CardData } from "@/data/seed"
import { InteractiveCard } from "@/components/cards/interactive-card"
import { CardControls } from "@/components/cards/card-controls"
import { VirtualCardGenerator } from "@/components/cards/virtual-card-generator"
import { CardList } from "@/components/cards/card-list"

export function CardsPageClient() {
  const [cards, setCards] = useState<CardData[]>(cardsData)
  const [activeCardId, setActiveCardId] = useState<string>(cardsData[0].id)
  const [frozenMap, setFrozenMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {}
    for (const c of cardsData) {
      map[c.id] = c.frozen
    }
    return map
  })
  const [dailyLimits, setDailyLimits] = useState<Record<string, number>>(
    () => {
      const map: Record<string, number> = {}
      for (const c of cardsData) {
        map[c.id] = c.dailyLimit
      }
      return map
    },
  )

  const activeCard = cards.find((c) => c.id === activeCardId) ?? cards[0]

  const toggleFreeze = useCallback(() => {
    setFrozenMap((prev) => ({
      ...prev,
      [activeCardId]: !prev[activeCardId],
    }))
  }, [activeCardId])

  const handleDailyLimitChange = useCallback(
    (val: number) => {
      setDailyLimits((prev) => ({ ...prev, [activeCardId]: val }))
    },
    [activeCardId],
  )

  const handleCardCreated = useCallback((card: CardData) => {
    setCards((prev) => [...prev, card])
    setFrozenMap((prev) => ({ ...prev, [card.id]: false }))
    setDailyLimits((prev) => ({ ...prev, [card.id]: card.dailyLimit }))
  }, [])

  return (
    <div className="space-y-6">
      {/* Row 1: Interactive card + controls */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="flex items-start justify-center lg:col-span-7">
          <InteractiveCard
            card={activeCard}
            frozen={frozenMap[activeCardId] ?? false}
          />
        </div>
        <div className="lg:col-span-5">
          <CardControls
            card={activeCard}
            frozen={frozenMap[activeCardId] ?? false}
            onToggleFreeze={toggleFreeze}
            dailyLimit={dailyLimits[activeCardId] ?? activeCard.dailyLimit}
            onDailyLimitChange={handleDailyLimitChange}
          />
        </div>
      </div>

      {/* Row 2: Virtual card generator + card list */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <VirtualCardGenerator onCardCreated={handleCardCreated} />
        </div>
        <div className="lg:col-span-8">
          <CardList
            cards={cards}
            activeCardId={activeCardId}
            onSelect={setActiveCardId}
            frozenMap={frozenMap}
          />
        </div>
      </div>
    </div>
  )
}
