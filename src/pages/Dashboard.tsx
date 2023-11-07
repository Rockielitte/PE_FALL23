import { Box, Table } from "@mui/joy";

import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import { DataType, arrayKey } from "../types";
import RowItem from "../components/RowItem";
import { z } from "zod";
import ModalForm from "../components/ModalForm";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

const Dashboard = () => {
  const data = useFetch<DataType[]>({
    endpoint: "PE",
  });

  return (
    <>
      {data.error ? (
        <Loading isError />
      ) : data.isLoading ? (
        <Loading />
      ) : (
        <>
          <Table
            aria-label="basic table"
            style={{
              overflow: "auto",
            }}
          >
            <thead>
              <tr>
                {arrayKey.map((item) => (
                  <th
                    key={item}
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {item}
                  </th>
                ))}
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody
              style={{
                overflow: "auto",
              }}
            >
              {data.data &&
                data?.data.map((item) => (
                  <RowItem key={item.id} item={item} refetch={data.refecth} />
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Dashboard;
