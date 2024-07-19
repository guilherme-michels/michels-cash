import { useState } from 'react'

import { Breadcrumb } from '../../components/breadcrumb'
import { SidebarTemplate } from '../../template/SidebarTemplate'
import { AvailableTimesModal } from './components/AvailableTimesModal'
import { CalendarHeaderCard } from './components/CalendarHeaderCard'
import { CalendarPageHeader } from './components/CalendarPageHeader'
import { CalendarSchedule } from './components/CalendarSchedule'
import { CalendarTabs } from './components/CalendarTabs'
import { FindAvailableTimesCard } from './components/FindAvailableTimesCard'

const availableTimes = {
  morning: ['08:00', '08:30', '09:00', '09:30', '10:00'],
  afternoon: ['13:00', '13:30', '14:00', '14:30', '15:00'],
}

const professionals = [
  { value: 'prof1', name: 'Dr. Smith' },
  { value: 'prof2', name: 'Dr. Johnson' },
]

export function CalendarPage() {
  const options = [
    { name: 'Página inicial', link: '/' },
    { name: 'Agenda', link: '/calendar' },
  ]
  const [isAvailableTimesModalVisible, setIsAvailableTimesModalVisible] =
    useState(false)
  const [selectedView, setSelectedView] = useState<'week' | 'day'>('week')

  return (
    <SidebarTemplate>
      <CalendarPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex w-full flex-col gap-4">
          <div className="grid grid-flow-row grid-cols-6 gap-4">
            <CalendarHeaderCard
              title="Consultas hoje"
              value={12}
              description="+25% em relação a ontem"
            />
            <CalendarHeaderCard
              title="Consultas esse mês"
              value={134}
              description="+4% em relação ao mês passado"
            />

            <FindAvailableTimesCard
              onOpenModal={() => setIsAvailableTimesModalVisible(true)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <CalendarTabs
                onChangeView={setSelectedView}
                selectedView={selectedView}
              />
            </div>
            <CalendarSchedule selectedView={selectedView} />
          </div>
        </div>
      </div>

      <AvailableTimesModal
        isOpened={isAvailableTimesModalVisible}
        onClose={() => setIsAvailableTimesModalVisible(false)}
        availableTimes={availableTimes}
        professionals={professionals}
      />
    </SidebarTemplate>
  )
}
