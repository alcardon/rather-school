import { useAuth } from "components/auth/AuthProvider";
import Nav from "components/common/Navbar";
import SidebarWithHeader from "components/common/Navbar";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
} from "@chakra-ui/react";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="card">
      <SidebarWithHeader>
        <Stack>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Last game</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Score</Th>
                  <Th isNumeric>Mark</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Game 1</Td>
                  <Td isNumeric>2</Td>
                  <Td isNumeric>4</Td>
                </Tr>
                <Tr>
                  <Td>Game 2</Td>
                  <Td isNumeric>1</Td>
                  <Td isNumeric>8</Td>
                </Tr>
                <Tr>
                  <Td>Game 3</Td>
                  <Td isNumeric>4</Td>
                  <Td isNumeric>4</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </SidebarWithHeader>
      <h2>Welcome!</h2>
    </div>
  );
}
