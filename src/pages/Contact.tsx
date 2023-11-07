import { Box, FormControl, FormLabel, Input, Textarea } from "@mui/joy";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { RiMailSendFill } from "react-icons/ri";

const Contact = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "auto",
        justifyContent: "center",
        height: "100%",
        padding: "10px",
        gap: "8px",
      }}
    >
      <Typography color="success" level="h1" textAlign={"center"}>
        CONTACT
      </Typography>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="SE171198@email.com"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea
          placeholder="Please leave your message here . . . "
          minRows={3}
        />
      </FormControl>
      <Button
        color={"success"}
        sx={{ mt: 1 /* margin top */ }}
        startDecorator={<RiMailSendFill />}
      >
        Send me
      </Button>
    </Box>
  );
};

export default Contact;
