import { useState } from "react";
import dayjs from "dayjs";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getFakeEvents } from "../api/calendar.service";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventFormModal } from "./EventFormModal";
import "./calendar.css";

const localizer = dayjsLocalizer(dayjs);

const defaultDate = new Date();

interface CalendarScheduleProps {
  selectedView: "week" | "day";
}

export function CalendarSchedule({ selectedView }: CalendarScheduleProps) {
  const [isEventFormModalVisible, setIsEventFormModalVisible] = useState(false);

  const [selectedSlotInfo, setSelectedSlotInfo] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const { data: calendarData } = useQuery({
    queryKey: ["calendar", {}],
    queryFn: () => getFakeEvents(),
  });

  const events = calendarData?.events || [];

  return (
    <div>
      <Card className="h-full flex flex-col gap-2 w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="space-y-1.5">
              <CardTitle className="w-full">Agenda</CardTitle>
              <CardDescription>Veja seus compromissos</CardDescription>
            </div>

            <Button
              onClick={() => {
                setSelectedSlotInfo(null);
                setIsEventFormModalVisible(true);
              }}
            >
              + Adicionar evento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <BigCalendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            views={["week", "day"]}
            view={selectedView}
            step={15}
            timeslots={2}
            selectable
            min={new Date(defaultDate.setHours(7, 0, 0))}
            max={new Date(defaultDate.setHours(22, 0, 0))}
            defaultDate={defaultDate}
            events={events}
            formats={{
              timeGutterFormat: "HH[h]mm",
              eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                `${localizer!.format(
                  start,
                  "HH[h]mm",
                  culture
                )} - ${localizer!.format(end, "HH[h]mm", culture)}`,
            }}
            components={{
              toolbar: (props) => (
                <div className="flex w-full justify-between mb-4 !items-center">
                  <div className="font-bold mb-4 text-lg">
                    {props.label.toUpperCase()}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => props.onNavigate("PREV")}
                      className="items-center gap-2 flex h-8"
                    >
                      <ChevronLeft size={20} />
                      Anterior
                    </Button>
                    <Button
                      onClick={() => props.onNavigate("NEXT")}
                      className="items-center gap-2 flex h-8"
                    >
                      Próximo
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                </div>
              ),
              event: (props) => (
                <div className="p-1 font-semibold">{props.title}</div>
              ),
              header: (props) => (
                <div className="w-full flex flex-col cursor-default">
                  <span className="text-sm font-normal text-zinc-600">
                    {props.label.slice(-3).charAt(0).toUpperCase() +
                      props.label.slice(-2)}
                    .
                  </span>
                  <strong className="text-xl font-semibold">
                    {dayjs(props.date).format("DD/MM")}
                  </strong>
                </div>
              ),
            }}
            onSelectEvent={(event) => {
              setSelectedSlotInfo(null);
              setSelectedEvent(event);
              setIsEventFormModalVisible(true);
            }}
            onSelectSlot={(slotInfo) => {
              setSelectedEvent(null);
              setSelectedSlotInfo(slotInfo);
              setIsEventFormModalVisible(true);
            }}
          />
        </CardContent>
      </Card>

      <EventFormModal
        isOpened={isEventFormModalVisible}
        slotInfo={selectedSlotInfo ? selectedSlotInfo : null}
        event={selectedEvent}
        onClose={() => setIsEventFormModalVisible(false)}
      />
    </div>
  );
}
