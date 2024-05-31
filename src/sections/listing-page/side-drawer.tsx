import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';

import { MainType, QueryParamsType } from '@/types/general';

import Filter from './filter';

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  type: MainType;
  setQueryParams: Dispatch<SetStateAction<QueryParamsType>>;
};

const SideDrawer: FC<SideDrawerProps> = ({ open, onClose, type, setQueryParams }) => {
  return (
    <Drawer
      anchor="left"
      PaperProps={{ sx: { pt: '130px', width: '100%', minWidth: 280 } }}
      open={open}
      onClose={onClose}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 20, top: 20 }}
        >
          <CloseIcon />
        </IconButton>
        <Filter
          type={type}
          closeDrawer={onClose}
          setQueryParams={setQueryParams}
          inDrawer
        />
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
