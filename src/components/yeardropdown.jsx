import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ items, name, onChange }) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value); // Call the onChange prop with the selected value
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-select-label`}>{name}</InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          value={selectedValue}
          label={name}
          onChange={handleChange}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
