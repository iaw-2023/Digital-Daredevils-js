"use client";

import { Spinner, useBreakpointValue } from '@chakra-ui/react';

const LoadingSpinner = () => {
  const size = useBreakpointValue({ base: 'md', lg: 'xl' });

  return (
    <div style={{ position: 'fixed', bottom: '2%', right: '2%' }}>
      <Spinner size={size} color="teal.500" />
    </div>
  );
};

export default LoadingSpinner;
