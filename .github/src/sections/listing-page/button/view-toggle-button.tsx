import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';

type ViewToggleProps = {
  handleViewToggle: () => void;
  view: boolean;
};

enum viewMode {
  card = 'cardView',
  list = 'listView',
}

const ViewToggleButton: FC<ViewToggleProps> = ({ handleViewToggle, view }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={view ? viewMode.card : viewMode.list}
      exclusive
      onChange={handleViewToggle}
      sx={{ ml: 2 }}
      size="small"
    >
      <ToggleButton
        value={viewMode.card}
        aria-label="module"
      >
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton
        value={viewMode.list}
        aria-label="list"
      >
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggleButton;
