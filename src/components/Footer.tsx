import { Sheet, Typography } from "@mui/joy";

const Footer = () => {
  return (
    <Sheet
      variant="soft"
      sx={{
        p: "12px",
        display: "flex",
        justifyContent: "center",
        boxShadow: "10px",
        fontWeight: "400",
        fontSize: "16px",
      }}
    >
      <Typography
        color="success"
        level="body-xs"
        fontWeight={"600"}
        endDecorator="@ SE171198"
      ></Typography>
    </Sheet>
  );
};

export default Footer;
