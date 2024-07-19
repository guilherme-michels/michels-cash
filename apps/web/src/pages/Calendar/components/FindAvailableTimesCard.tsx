import { CalendarClock } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface FindAvailableTimesCardProps {
  onOpenModal: () => void;
}

export function FindAvailableTimesCard({
  onOpenModal,
}: FindAvailableTimesCardProps) {
  return (
    <Card
      className="bg-green-300 bg-opacity-20 hover:bg-opacity-45 transition-all cursor-pointer border-green-600 border-[1px]"
      onClick={onOpenModal}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex gap-2 text-zinc-900">
          <CalendarClock />
          Horários livres
        </CardTitle>
        <CardDescription className="text-zinc-800">
          Veja os horários disponíveis dos seus profissionais para marcar novas
          consultas.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
