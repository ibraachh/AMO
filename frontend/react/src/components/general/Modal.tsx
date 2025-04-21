import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  setOpen: (open: boolean) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  zIndex: 9999,
  border: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "300ms all ease",
  width: { xs: "90%" },
};

const BasicModal: React.FC<ModalProps> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(!open);
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center items-center"
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          transition: "0.3s ease",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          width: "100%",
          margin: { xs: "0 auto" },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[90%]"
        >
          <Box sx={style}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "40px", md: "80px" },
                marginBottom: "20px",
              }}
            >
              {t("Search")}
            </Typography>
            <form
              action=""
              className="w-full mx-auto flex justify-center items-center"
            >
              <input
                type="search"
                id="search"
                name="search"
                placeholder={t("Search...")}
                className="bg-white md:w-[600px] w-full rounded-[10px] p-[20px] font-open-sans text-[30px]"
              />
            </form>
          </Box>
          <button
            onClick={handleClose}
            className="absolute right-[100px] top-[100px] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </motion.div>
      </Modal>
    </motion.div>
  );
};

export default BasicModal;
