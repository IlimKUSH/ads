import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import MUIModal, { ModalProps } from '@mui/material/Modal';

const contentStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '90vh',
  minWidth: { xs: 320, sm: 450, md: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 1.5, sm: 4 },
  outline: 'none',
  overflow: 'auto',
};

const Modal = ({ children, ...rest }: ModalProps) => (
  <MUIModal
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    {...rest}
  >
    <Box sx={contentStyle} {...rest}>
      {children}
    </Box>
  </MUIModal>
);

export default Modal;
