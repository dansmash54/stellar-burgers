import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getCurrentUserName } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getCurrentUserName);

  return <AppHeaderUI userName={userName} />;
};
