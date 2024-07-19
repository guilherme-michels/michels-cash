import moment from "moment";
import { EventData } from "../schemas/eventSchema";

export function getFakeEvents(): Promise<{
  message: string;
  events: EventData[];
}> {
  const events: EventData[] = [
    {
      id: 1,
      title: "Evento 1",
      allDay: false,
      start: moment("2024-06-20T07:30:00").toDate(),
      end: moment("2024-06-20T08:40:00").toDate(),
      resource: null,
      patientId: "1",
      patient: {
        name: "Guilherme Michels",
        age: 23,
        cpf: "05070239007",
        mail: "guilherme.michels@universo.univates.br",
        phone: "55 51 99490889",
      },
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "sucesso",
        events: events,
      });
    }, 500);
  });
}
