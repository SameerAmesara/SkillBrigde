import { observer } from "mobx-react";
import { useStores } from "../../mobx/RootStore";
import { useEffect } from "react";
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate } from "../../utils/helpers";
import { theme } from "../../utils/theme";

const TransactionsPage = observer(() => {
  const { paymentsStore } = useStores();
  const { transactions, transactionsParams } = paymentsStore;

  console.log(transactions);

  useEffect(() => {
    paymentsStore.fetchTransactions();
  }, []);

  const tableHeaders: TableHeader[] = [
    { label: "Description", align: "left" },
    { label: "Card", align: "left" },
    { label: "Date", align: "left" },
    { label: "Amount", align: "right" },
  ];

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    paymentsStore.updateTransactionParams({ page: value });
    paymentsStore.fetchTransactions();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={header.label + index} align={header.align}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell component="th" sx={{ fontWeight: 500 }}>
                  {transaction.description.slice(0, 20)}
                </TableCell>
                <TableCell align="left">
                  {transaction.cardLast4 ? `**** ${transaction.cardLast4}` : ""}
                </TableCell>
                <TableCell align="left">
                  {formatDate(transaction.createdAt)}
                </TableCell>
                <TableCell
                  component="th"
                  align="right"
                  sx={{ fontWeight: 500 }}
                >
                  ${transaction.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={transactionsParams.totalPages}
        page={transactionsParams.page}
        onChange={handlePageChange}
      />
    </Box>
  );
});

interface TableHeader {
  label: string;
  align: "right" | "left" | "center" | "inherit" | "justify";
}

export default TransactionsPage;
