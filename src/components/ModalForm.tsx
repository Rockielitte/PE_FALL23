import {
  Alert,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
} from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";
import React from "react";
import {
  FieldValues,
  Path,
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";
import { toast } from "react-toastify";

import { GrAdd, GrSend } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  items: Path<T>[];
  trigger: string;
  endpoint: string;
  method: string;
  refetch: () => void;
  reset?: boolean;
};
const ModalForm = <T extends FieldValues>({
  form,
  items,
  trigger,
  endpoint,
  method,
  refetch,
  reset,
}: Props<T>) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const submitHandler: SubmitHandler<T> = async (value) => {
    console.log(value);
    await axios<T>({
      url: `https://6543c49601b5e279de20edcb.mockapi.io/PE/${endpoint}`,
      data: value,
      method: method,
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        toast.success("Successfully!");
        refetch && refetch();
        setOpen(false);
        reset && form.reset();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error("UnSuccessfully");
        }
      });
  };
  return (
    <React.Fragment>
      <Button
        startDecorator={trigger == "Create" ? <GrAdd /> : <FaUserEdit />}
        color={trigger == "Create" ? "success" : "warning"}
        size="sm"
        variant="solid"
        onClick={() => {
          setOpen(true);
        }}
      >
        {trigger}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle
            sx={{
              textAlign: "center",
              margin: "auto",
              width: "80%",
              display: "flex",
              justifyContent: "center",
              padding: "4px",
              borderRadius: "20px",
              textTransform: "uppercase",
              fontWeight: "800",
            }}
            color="success"
            variant="soft"
          >
            {trigger}
          </DialogTitle>
          <DialogContent
            sx={{
              width: "400px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                md: {
                  width: "50%",
                },
                width: "100%",
                margin: "auto",
                justifyContent: "center",
                height: "100%",
                padding: "16px",
              }}
            >
              <form
                onSubmit={form.handleSubmit(submitHandler)}
                style={{
                  height: "70%",
                  width: "100%",
                  overflow: "auto",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {items.slice(1).map((item) => {
                  switch (item) {
                    case "isTopOfTheWeek": {
                      return (
                        <FormControl key={item}>
                          <FormLabel
                            sx={() => ({
                              textTransform: "capitalize",
                              fontWeight: "800",
                            })}
                          >
                            {item}
                          </FormLabel>
                          <input
                            type="checkbox"
                            checked={form.getValues(item)}
                            onChange={() => {
                              form.setValue(item, !form.getValues(item), {
                                shouldValidate: true,
                              });
                            }}
                          />
                        </FormControl>
                      );
                    }
                    default: {
                      return (
                        <FormControl key={item}>
                          <FormLabel
                            sx={() => ({
                              textTransform: "capitalize",
                              fontWeight: "800",
                            })}
                          >
                            {item}
                          </FormLabel>
                          <Input
                            placeholder={`Enter your ${item} . . .`}
                            {...form.register(item as Path<T>)}
                          />
                          {form.formState.errors[item as Path<T>] && (
                            <Alert
                              startDecorator={<WarningIcon />}
                              variant="soft"
                              color="danger"
                              style={{
                                marginTop: "10px",
                              }}
                            >
                              {form.formState.errors[item as Path<T>]?.message}
                            </Alert>
                          )}
                        </FormControl>
                      );
                    }
                  }
                })}

                <Button
                  color="success"
                  type="submit"
                  sx={{ mt: 1 /* margin top */ }}
                  startDecorator={<GrSend color={"#fff"} />}
                  loading={form.formState.isSubmitting}
                >
                  Send
                </Button>
              </form>
              ;
            </Box>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
export default ModalForm;
