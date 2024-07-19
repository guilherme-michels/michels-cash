import { NavigationMenuLink } from "../ui/navigation-menu";
import { ListItem } from "./list-item";

export function FinancialNavMenu() {
  return (
    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white border-[1px] border-zinc-200 rounded-xl">
      <li className="row-span-3">
        <NavigationMenuLink>
          <a
            className="shadow-md shadow-zinc-500 flex h-full w-full select-none bg-zinc-100 flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
            href="/"
          >
            <div className="mb-2 mt-4 text-lg font-medium">Fluxo de caixa</div>
            <p className="text-sm leading-tight text-muted-foreground">
              Veja tudo sobre suas transferências aqui além de gráficos para
              acompanhar suas metas financeiras.
            </p>
          </a>
        </NavigationMenuLink>
      </li>

      <ListItem url="/financial/comission" title="Comissões">
        Analíse as comissões
      </ListItem>

      <ListItem url="/financial/ticket" title="Boletos">
        Gere boletos e controle seus débitos
      </ListItem>
    </ul>
  );
}
