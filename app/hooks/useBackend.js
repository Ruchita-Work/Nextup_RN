import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import config from '../config';
import { errorToast } from '../utils/toast';

const useBackend = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  }, []);

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { nonce, identityToken } = appleAuthRequestResponse;

      if (!appleAuthRequestResponse.identityToken) {
        errorToast({
          title: 'Error',
          body: 'Apple Sign in failed. Please try again.',
        });
      }
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      return auth().signInWithCredential(appleCredential);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
      return null;
    }
  };

  const firebaseGoogleLogin = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      return auth().signInWithCredential(credential);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleImperativeLogin = async id => {
    try {
      if (id === 0) {
        const facebookUser = await handleFacebookLogin();
        return facebookUser;
      } else if (id === 1) {
        const appleUser = await handleAppleLogin();
        return appleUser;
      } else {
        const googleUser = await firebaseGoogleLogin();
        return googleUser;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Other methods can be converted similarly

  return {
    handleImperativeLogin,
    // Add other methods here
  };
};

export default useBackend;
