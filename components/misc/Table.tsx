import {
  ColumnDef,
  OnChangeFn,
  VisibilityState,
  getCoreRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

type props = {
  size?: "sm" | "md" | "lg";
  columns: ColumnDef<any, any>[];
  data: any[];
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
};

function Table(props: props) {
  const {
    size = "sm",
    columns,
    data,
    columnVisibility = {},
    onColumnVisibilityChange,
  } = props;

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ChakraTable size={size}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
}

export default Table;
