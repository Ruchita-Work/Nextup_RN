import { useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { getQueryParamsFromURL } from './helper';

const FBDynamicLinkHandler = () => {
  const onSuccessLinkHandler = link => {
    if (link?.url && typeof link.url === 'string') {
      const { queryParams, domainSuffix } = getQueryParamsFromURL(link.url);
      const user_id = queryParams?.user_id;

      // TODO : Add some logic based on domainSuffix and queryParams
    }
  };

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(onSuccessLinkHandler)
      .catch(e =>
        console.log('FBDynamicLinkHandler getInitialLink error ==>', e),
      );

    const unsubscribe = dynamicLinks().onLink(onSuccessLinkHandler);
    return () => unsubscribe();
  }, []);

  return null;
};

export default FBDynamicLinkHandler;
