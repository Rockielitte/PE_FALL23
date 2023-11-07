type Props = {
  item: DataType;
  refetch: (query?: string | undefined) => void;
};
import { DataType, arrayKey } from "../types";
import { format } from "date-fns";
import AlertDialogModal from "./AlertModal";
import ModalForm from "./ModalForm";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Path, useForm } from "react-hook-form";
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  rating: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  isTopOfTheWeek: z.boolean(),
  image: z.string().url(),
  color: z.string().min(1),
  origin: z.string().min(1),
  category: z.string().min(1),
});
type formSchemaType = z.infer<typeof formSchema>;

const RowItem = ({ item, refetch }: Props) => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      rating: item.rating,
      price: item.price,
      isTopOfTheWeek: item.isTopOfTheWeek,
      image: item.image,
      color: item.color,
      origin: item.origin,
      category: item.category,
    },
  });
  return (
    <>
      <tr>
        {arrayKey.map((key) => {
          switch (key) {
            case "image": {
              return (
                <td key={key}>
                  <img
                    src={item[key]}
                    alt="avt"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "999px",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  />
                </td>
              );
            }
            case "isTopOfTheWeek": {
              return <td key={key}>{item[key] ? "True" : "False"}</td>;
            }
            default: {
              return <td key={key}>{item[key as keyof DataType] as string}</td>;
            }
          }
        })}

        <td>
          <ModalForm
            refetch={refetch}
            items={arrayKey as Path<formSchemaType>[]}
            method="PUT"
            trigger="Update"
            form={form}
            endpoint={item.id}
          />
        </td>
        <td>
          <AlertDialogModal refetch={refetch} id={item.id} />
        </td>
      </tr>
    </>
  );
};

export default RowItem;
