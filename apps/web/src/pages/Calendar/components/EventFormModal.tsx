import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { EventData, eventSchema } from "../schemas/eventSchema";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { FormInput } from "../../../components/form-input";
import { FormDatePicker } from "../../../components/form-datepicker";

interface EventFormModalProps {
  isOpened: boolean;
  onClose: () => void;
  slotInfo?: {
    start: Date;
    end: Date;
    slots: Date[];
    action: "select" | "click" | "doubleClick";
  };
  event?: EventData;
}

export function EventFormModal({
  isOpened,
  onClose,
  slotInfo,
  event,
}: EventFormModalProps) {
  const { setValue, control, reset } = useForm<EventData>({
    resolver: zodResolver(eventSchema),
  });

  const [appointmentType, setAppointmentType] = useState<
    "appointment" | "scheduling"
  >("appointment");

  const defaultSlotInfo = {
    start: null,
    end: null,
    slots: [],
    action: "select",
  };

  const info = slotInfo ?? defaultSlotInfo;

  useEffect(() => {
    const fetchEventData = async () => {
      if (event) {
        setValue("patient.name", event.patient?.name ?? "");
        setValue("user.name", event.user?.name ?? "");
        setValue("start", event.start);
        if (info.action === "select" && info.end) {
          setValue("end", info.end);
        }
      } else {
        reset();
      }
    };

    fetchEventData();
  }, [event, info.action, info.end, setValue, reset]);

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-bold flex flex-col text-xl">
            {event ? "Editar agendamento" : "Adicionar agendamento"}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button
              className={`p-2 rounded ${
                appointmentType === "appointment"
                  ? "bg-[#ccb79c] text-[#574436] border-[1px] border-[#574436]"
                  : "bg-gray-200 text-black border-[1px]"
              }`}
              onClick={() => setAppointmentType("appointment")}
              type="button"
            >
              Consulta
            </Button>
            <Button
              className={`p-2 rounded ${
                appointmentType === "scheduling"
                  ? "bg-[#ccb79c] text-[#574436] border-[1px] border-[#574436]"
                  : "bg-gray-200 text-black border-[1px]"
              }`}
              onClick={() => setAppointmentType("scheduling")}
              type="button"
            >
              Compromisso
            </Button>
          </div>

          {appointmentType === "appointment" && (
            <>
              <FormInput
                control={control}
                name="patient.name"
                label="Paciente"
                required
                placeholder="Selecione o paciente"
              />

              <FormInput
                control={control}
                name="user.name"
                label="Profissional"
                required
                placeholder="Selecione o profissional responsável"
              />
            </>
          )}

          {appointmentType === "scheduling" && (
            <FormInput
              control={control}
              name="title"
              label="Qual é o compromisso?"
              required
              placeholder="Digite o compromisso"
            />
          )}

          <FormDatePicker
            control={control}
            label="Data"
            name="start"
            defaultValue={info.start! ? info.start : new Date()}
          />

          <div className="flex gap-4 items-center">
            <Input
              label="Hora de início"
              required
              type="time"
              defaultValue={
                info.start
                  ? dayjs(info.start).format("HH:mm")
                  : dayjs().format("HH:mm")
              }
            />

            {info.action === "select" ? (
              <Input
                label="Hora final"
                required
                type="time"
                defaultValue={
                  info.end
                    ? dayjs(info.end).format("HH:mm")
                    : dayjs().add(30, "minute").format("HH:mm")
                }
              />
            ) : (
              <Input
                required
                placeholder="Tempo de duração"
                label="Duração da consulta (min)"
                defaultValue={15}
                type="number"
              />
            )}
          </div>

          <Input
            placeholder="Em quanto tempo o paciente deverá retornar..."
            label="Retornar em:"
            defaultValue={"Sem retorno"}
          />

          <div className="items-top flex space-x-2 px-4 p-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enviar confirmação e lembrete de consulta automático.
              </label>
              <p className="text-sm text-muted-foreground">
                O paciente e o responsável receberão lembretes perto da data.
              </p>
            </div>
          </div>

          <DialogFooter className="flex w-full justify-between items-center">
            <span className="text-sm text-zinc-700">Campos obrigatórios *</span>
            <div className="flex gap-2">
              <Button
                className="bg-opacity-0 text-black border-[1px] border-black hover:bg-zinc-200 transition-all"
                onClick={onClose}
                type="button"
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
