import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({ alignment, onToggleChange }) {

  const handleChange = (event, newAlignment) => {
    if(newAlignment!==null){
        onToggleChange(newAlignment)
    }
    
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={true}>↑</ToggleButton>
      <ToggleButton value={false}>↓</ToggleButton>
    </ToggleButtonGroup>
  );
}