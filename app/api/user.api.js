import { useMutation, useQuery } from 'react-query';
import { useClient } from '../hooks/useClient';
import { useAuth } from '../hooks/useAuth';

export function useUserUpdateCertificates({ onSuccess }) {
  const client = useClient();
  return useMutation(
    ({ data, id }) => {
      return client(`user/update/profile/${id}`, { method: 'POST', data });
    },
    {
      onSuccess: data => {
        onSuccess(data);
      },
    },
  );
}

export const useGetBasicUserInfo = () => {
  const client = useClient();
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-basic-info', { userId: user?.id }],
    queryFn: () => client(`user/basic/info/${user?.id}`),
  });
};

export const useEditUserProfile = () => {
  const client = useClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: ({ data }) =>
      client(`user/update/profile/${user?.id}`, { method: 'POST', data }),
  });
};
