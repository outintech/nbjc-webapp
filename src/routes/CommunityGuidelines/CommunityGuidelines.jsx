import { Typography } from '@material-ui/core';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CommunityGuidelines = () => {
  const matches = useMediaQuery('(min-width:376px)');
  return (
    <Typography variant={matches ? 'h4' : 'subtitle1'} align="center">
      Community Guidelines
    </Typography>
  );
};

export default CommunityGuidelines;
