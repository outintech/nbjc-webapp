import { useEffect, useState } from 'react';
import utils from '../utils';

const useMobileDevice = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    setIsMobileOrTablet(utils.isMobileOrTabletDevice());
  });

  return [isMobileOrTablet];
};

export default useMobileDevice;
