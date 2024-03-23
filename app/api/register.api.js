import { useMutation } from 'react-query';
import { useClient } from '../hooks/useClient';

export function useUserRegister({ onSuccess }) {
  const client = useClient();
  return useMutation(
    data => {
      return client('user/register', {
        method: 'POST',
        data,
      });
    },
    {
      onSuccess: data => {
        onSuccess(data);
      },
    },
  );
}
