/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { marked } from "marked";

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
    xl: "40%",
    "2xl": "60%", // Wider modal for 4K
  },
  maxWidth: {
    xs: "800px",
    "2xl": "2400px", // Much larger max-width for 4K
  },
  maxHeight: {
    xs: "90vh",
    "2xl": "85vh",
  },
  overflow: "auto",
  bgcolor: "#fafaf8",
  borderRadius: {
    xs: "8px",
    "2xl": "16px", // Larger border radius for 4K
  },
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  p: {
    xs: 2,
    sm: 4,
    "2xl": 8, // Increased padding for 4K
  },
  "&:focus": {
    outline: "none",
  },
  "&::-webkit-scrollbar": {
    width: {
      xs: "8px",
      "2xl": "16px", // Larger scrollbar for 4K
    }
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: {
      xs: "4px",
      "2xl": "8px",
    }
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: {
      xs: "4px",
      "2xl": "8px",
    },
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
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              "2xl": "4rem", // Much larger title for 4K
            },
            fontWeight: 600,
            color: "#1f2937",
            mb: {
              xs: 2,
              "2xl": 6,
            },
            borderBottom: "1px solid #e5e7eb",
            pb: {
              xs: 2,
              "2xl": 4,
            },
          }}
        >
          {item.title}
        </Typography>
        <Typography
          id="modal-modal-description"
          component="div"
          sx={{
            color: "#4b5563",
            fontSize: {
              xs: "1rem",
              sm: "1.5rem",
              "2xl": "2.5rem", // Much larger base font for 4K
            },
            lineHeight: {
              xs: 1.7,
              "2xl": 1.8,
            },
            "& p": {
              mb: {
                xs: 2,
                "2xl": 4,
              },
            },
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              color: "#1f2937",
              fontWeight: 600,
              mt: {
                xs: 3,
                "2xl": 6,
              },
              mb: {
                xs: 2,
                "2xl": 4,
              },
              fontSize: {
                xs: "inherit",
                "2xl": "calc(100% + 1rem)", // Larger heading scale for 4K
              },
            },
            "& ul, & ol": {
              pl: {
                xs: 3,
                "2xl": 6,
              },
              mb: {
                xs: 2,
                "2xl": 4,
              },
            },
            "& li": {
              mb: {
                xs: 1,
                "2xl": 2,
              },
            },
            "& code": {
              backgroundColor: "#f3f4f6",
              padding: {
                xs: "2px 4px",
                "2xl": "8px 16px", // Larger code padding for 4K
              },
              borderRadius: {
                xs: "4px",
                "2xl": "8px",
              },
              fontSize: {
                xs: "0.875em",
                "2xl": "0.9em",
              },
            },
            "& pre": {
              backgroundColor: "#f3f4f6",
              padding: {
                xs: 2,
                "2xl": 6,
              },
              borderRadius: {
                xs: "4px",
                "2xl": "8px",
              },
              overflow: "auto",
              mb: {
                xs: 2,
                "2xl": 4,
              },
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