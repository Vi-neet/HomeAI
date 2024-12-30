import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { marked } from "marked";
import { useState } from "react";
/* eslint-disable react/prop-types */

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ItemCardModal({ item}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const renderedMarkdown = marked(item.content);
  return (
    <div>
      <Button onClick={handleOpen}>Read More</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {item.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              className="item-content"
              dangerouslySetInnerHTML={{
                __html: renderedMarkdown,
              }}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
