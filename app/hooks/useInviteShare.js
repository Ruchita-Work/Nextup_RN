import { Platform } from 'react-native';
import { getInvitePlayerDynamicLink } from '../utils/helper';
import { useAuth } from './useAuth';
import Share from 'react-native-share';

const useInviteShare = () => {
  const { user } = useAuth();
  const openShareSheet = async () => {
    try {
      const url = await getInvitePlayerDynamicLink(user?.id);
      const title = 'Nextup';
      const subTitle = 'Invite friend';
      const options = Platform.select({
        ios: {
          activityItemSources: [
            {
              placeholderItem: { type: 'url', content: subTitle },
              item: { default: { type: 'text', content: url } },
              linkMetadata: { title },
            },
          ],
        },
        default: { title, subject: title, message: url },
      });
      Share.open(options);
    } catch (error) {}
  };

  return { openShareSheet };
};

export default useInviteShare;
