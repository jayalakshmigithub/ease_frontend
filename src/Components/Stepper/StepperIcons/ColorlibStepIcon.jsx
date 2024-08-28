import React from 'react';
import { styled } from '@mui/material/styles';
import { Check, GroupAdd } from '@mui/icons-material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active ? theme.palette.primary.main : theme.palette.grey[400],
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ColorlibStepIcon = (props) => {
  const { active, completed, icon } = props;

  const icons = {
      1: <WorkspacesIcon />,
      2: <GroupAdd />,
      3: <AddLinkIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ active }}>
      {completed ? <Check /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
};

export default ColorlibStepIcon;
