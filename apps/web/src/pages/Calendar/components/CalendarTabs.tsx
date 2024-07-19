import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs'

interface CalendarTabsProps {
  onChangeView: (view: 'week' | 'day') => void
  selectedView: 'week' | 'day'
}

export const CalendarTabs: React.FC<CalendarTabsProps> = ({
  onChangeView,
  selectedView,
}) => {
  return (
    <Tabs defaultValue="week" className="col-span-4">
      <TabsList>
        <TabsTrigger
          value="week"
          onClick={() => onChangeView('week')}
          defaultChecked={selectedView === 'week'}
        >
          Semana
        </TabsTrigger>
        <TabsTrigger
          value="day"
          onClick={() => onChangeView('day')}
          defaultChecked={selectedView === 'day'}
        >
          Dia
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
