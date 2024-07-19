import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  canFilterColumns?: boolean;
  isPaginated?: boolean;
  isSearchable?: boolean;
  dateFilter?: boolean;
  columnToSearch?: string;
  pageIndex?: number;
  totalPages?: number | null;
  onPageChange?: (pageIndex: number) => void;
  getRowProps?: (row: TData) => React.HTMLAttributes<HTMLTableRowElement>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isPaginated = true,
  // isSearchable = true,
  // columnToSearch = "name",
  pageIndex,
  totalPages,
  onPageChange,
  getRowProps = () => ({}),
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handlePreviousPage = () => {
    if (onPageChange && typeof onPageChange === "function") {
      const previousPageIndex = pageIndex! - 1;
      if (previousPageIndex >= 1) {
        onPageChange(previousPageIndex);
      }
    }
  };

  const handleNextPage = () => {
    if (onPageChange && typeof onPageChange === "function") {
      const nextPageIndex = pageIndex! + 1;
      if (nextPageIndex <= totalPages!) {
        onPageChange(nextPageIndex);
      }
    }
  };

  return (
    <div className="rounded-md border bg-white">
      <div className="flex items-center w-full justify-between">
        {/* <div className="mt-4 ml-4 w-full mb-4">
          <Input
            placeholder={`Buscar...`}
            value={
              (table.getColumn(columnToSearch)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(columnToSearch)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-zinc-100"
            disabled={!isSearchable}
          />
        </div> */}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                {...getRowProps(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`${
                      cell.column.id === "actions" ||
                      cell.column.id === "patientImg"
                        ? "w-12"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isPaginated && (
        <div className="flex items-center justify-between space-x-2 py-4 bg-white">
          <span className="text-sm pl-4 text-zinc-600">
            Página {pageIndex ? pageIndex : "1"} de{" "}
            {totalPages ? totalPages : "1"}
          </span>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={pageIndex && totalPages ? pageIndex === 1 : true}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={
                pageIndex && totalPages ? pageIndex === totalPages : true
              }
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
