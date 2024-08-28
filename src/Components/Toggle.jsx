import React, { useState } from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import { WbSunny, Brightness2 } from '@mui/icons-material';

const ToggleButton = styled(IconButton)(({ checked }) => ({
  backgroundColor: '#6b6b6b6b',
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
  boxShadow: '0 0 50px 20px rgba(0, 0, 0, 0.1)',
  lineHeight: '1',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background-color 500ms',

  '& .icon': {
    gridColumn: '1 / 1',
    gridRow: '1 / 1',
    transition: 'transform 500ms',
  },

  '& .icon--moon': {
    color: 'black',
    transitionDelay: '200ms',
    transform: checked ? 'rotate(360deg) scale(0)' : 'rotate(0deg) scale(1)',
  },

  '& .icon--sun': {
    color: 'black',
    transform: checked ? 'scale(1) rotate(360deg)' : 'scale(0)',
    transitionDelay: checked ? '200ms' : '0ms',
  },
}));

const Toggle = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ToggleButton onClick={handleToggle} checked={checked}>
      <Brightness2 className="icon icon--moon" />
      <WbSunny className="icon icon--sun" />
    </ToggleButton>
  );
};

export default Toggle;
