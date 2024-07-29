import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

function CustomModal({
  open,
  onCloseModal,
  children,
}: {
  open: boolean;
  onCloseModal: Function;
  //   children: any;
  children: React.JSX.Element;
}) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

  const handleClose = () => onCloseModal();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <div>
            <input type="text" placeholder="Enter book title" />
          </div> */}
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
