import Typography from "@mui/joy/Typography";
import { format } from "date-fns";
import { Box, Stack } from "@mui/joy";
import { DataType, arrayKey } from "../types";
type Props = {
  item: DataType;
};

const CardIemDetail = ({ item }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Stack
        display={"flex"}
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        gap={2}
      >
        <Box
          sx={() => ({
            width: "100%",
            height: "50%",
            alignItems: "center",
            display: "flex",
            justifyItems: "center",
          })}
        >
          <img
            src={
              item.image ||
              "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
            }
            loading="lazy"
            alt=""
            style={{
              margin: "auto",
              height: "100%",
              border: "2px gray",
              borderRadius: "999px",
            }}
          />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            width: "100%",
            md: {
              width: "50%",
            },
          }}
        >
          <div>
            <Typography level="h1">{item.name}</Typography>
            {arrayKey.slice(3).map((key) => (
              <Typography level="body-sm">
                <b>{`${key.toUpperCase()}:`}</b>
                {`    ${item[key]}`}
              </Typography>
            ))}
          </div>
        </Box>
      </Stack>
    </Box>
  );
};

export default CardIemDetail;
