import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { marked } from "marked";
/* eslint-disable react/prop-types */

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: "60%",
    lg: "50%",
  },
  maxWidth: "800px",
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "#fafaf8",
  borderRadius: "8px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  p: { xs: 2, sm: 4 },
  "&:focus": {
    outline: "none",
  },
  // Custom scrollbar styling
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
    "&:hover": {
      background: "#666",
    },
  },
};

export default function ItemCardModal({ item, open, onClose }) {
  const renderedMarkdown = marked(item.content);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            fontWeight: 600,
            color: "#1f2937",
            mb: 2,
            borderBottom: "1px solid #e5e7eb",
            pb: 2,
          }}
        >
          {item.title}
        </Typography>
        <Typography
          id="modal-modal-description"
          component="div"
          sx={{
            color: "#4b5563",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            lineHeight: 1.7,
            "& p": {
              mb: 2,
            },
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              color: "#1f2937",
              fontWeight: 600,
              mt: 3,
              mb: 2,
            },
            "& ul, & ol": {
              pl: 3,
              mb: 2,
            },
            "& li": {
              mb: 1,
            },
            "& code": {
              backgroundColor: "#f3f4f6",
              padding: "2px 4px",
              borderRadius: "4px",
              fontSize: "0.875em",
            },
            "& pre": {
              backgroundColor: "#f3f4f6",
              padding: 2,
              borderRadius: "4px",
              overflow: "auto",
              mb: 2,
            },
          }}
        >
          <div
            className="item-content font-bold"
            dangerouslySetInnerHTML={{
              __html: renderedMarkdown,
            }}
          />
        </Typography>
      </Box>
    </Modal>
  );
}
