import React from "react";
import { useTable } from "react-table";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { map } from "ramda";

type props = {
  size?: "sm" | "md" | "lg";
  columns: any;
  data: any;
  hiddenColumns?: string[];
};

function Table(props: props) {
  const { size = "sm", columns, data, hiddenColumns = [] } = props;
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    setHiddenColumns,
    headerGroups,
    rows,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns,
    },
  });

  React.useEffect(() => {
    setHiddenColumns(hiddenColumns);
  }, [hiddenColumns, setHiddenColumns]);

  return (
    <ChakraTable size={size} {...getTableProps()}>
      <Thead>
        {map(
          (group) => (
            <Tr
              {...group.getHeaderGroupProps()}
              key={group.getHeaderGroupProps().key}
            >
              {map(
                (column) => (
                  <Th
                    {...column.getHeaderProps()}
                    key={column.getHeaderProps().key}
                  >
                    {column.render("Header")}
                  </Th>
                ),
                group.headers
              )}
            </Tr>
          ),
          headerGroups
        )}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} key={row.getRowProps().key}>
              {map((cell) => {
                return (
                  <Td {...cell.getCellProps()} key={cell.getCellProps().key}>
                    {cell.render("Cell")}
                  </Td>
                );
              }, row.cells)}
            </Tr>
          );
        }, rows)}
      </Tbody>
    </ChakraTable>
  );
}

export default Table;
