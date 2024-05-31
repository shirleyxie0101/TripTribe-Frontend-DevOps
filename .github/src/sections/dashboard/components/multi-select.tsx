import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { useCallback } from 'react';
import type { ChangeEvent, FC } from 'react';

import { usePopover } from '@/hooks/use-popover';

interface MultiSelectProps {
  label: string;
  onChange: (filterCategory: string, value: Array<string | number>) => void;
  options: { label: string; value: string | number }[];
  value: Array<string | number> | undefined;
}

export const MultiSelect: FC<MultiSelectProps> = (props) => {
  const { label, onChange, options, value = [], ...other } = props;

  const popover = usePopover<HTMLButtonElement>();

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const filterCategory = label.toLowerCase();
      let newValue = [...value];

      if (event.target.checked) {
        newValue.push(event.target.value);
      } else {
        newValue = newValue.filter((item) => item !== event.target.value);
      }

      onChange(filterCategory, newValue);
    },
    [onChange, label, value]
  );

  return (
    <>
      <Button
        color="inherit"
        endIcon={
          <SvgIcon>
            <ChevronDownIcon />
          </SvgIcon>
        }
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        {...other}
      >
        {label}
      </Button>
      <Menu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        PaperProps={{ style: { width: 250 } }}
      >
        {options.map((option) => (
          <MenuItem key={option.label}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value.includes(option.value.toString())}
                  onChange={handleValueChange}
                  value={option.value}
                />
              }
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
