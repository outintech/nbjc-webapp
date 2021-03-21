import { useHistory } from 'react-router-dom';

const useErrors = () => {
  const history = useHistory();
  const notFoundError = () => {
    history.push('/404');
  };
  return {
    notFoundError,
  };
};

export default useErrors;
