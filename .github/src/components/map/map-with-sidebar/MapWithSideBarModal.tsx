import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from '@mui/material';
import React from 'react';

import { MapWithSideBar } from '@/components/map/map-with-sidebar';
export const MapWithSideBarModal = ({
  mapIsOpen,
  toggleMapIsOpen,
}: {
  mapIsOpen: boolean;
  toggleMapIsOpen: (state: boolean) => void;
}) => {
  return (
    <Modal
      open={mapIsOpen}
      aria-labelledby="listing-map-modal"
      aria-describedby="listing-map-modal"
    >
      <React.Fragment>
        <IconButton
          sx={{
            zIndex: 999,
            position: 'absolute',
            width: 40,
            height: 40,
            top: 10,
            right: 10,
            borderRadius: '50%',
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'white',
            },
          }}
          onClick={() => {
            toggleMapIsOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <MapWithSideBar />
      </React.Fragment>
    </Modal>
  );
};
