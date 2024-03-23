import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { errorToast, successToast } from '../utils/toast';
import axios from 'axios';
import { useState } from 'react';
export const BASE_URL = 'http://34.134.29.128:8081/v1';

/**
 * A hook that handles document upload functionality.
 *
 * @param {Object} initialData - The initial data.
 * @return {Object} An object with functions to pick and scan documents.
 */
export const useUpload = () => {
  const [isUploading, setIsUploading] = useState({
    loading: false,
    type: null,
  });
  const [uploadProgress, setUploadProgress] = useState('uploading...');
  const [uploadedDocument, setUploadedDocument] = useState(null);

  /**
   * Make an API request to upload a file using axios.
   *
   * @param {Object} data - The data object containing ref, refId, and file.
   * @return {Promise} A promise that resolves with the response or rejects with an error.
   */
  const makeUploadApiRequest = async data => {
    return await axios({
      method: 'POST',
      url: BASE_URL + '/storage/upload/image',
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*',
      },
      data: data,
    })
      .then(res => {
        setUploadedDocument(res?.data);
        return res.data;
      })
      .catch(err => {
        return err;
      });
  };

  /**
   * Handle the upload of a file.
   *
   * @param {Object} resp - The response object from picking or scanning a document.
   */
  const handleUpload = async resp => {
    const file = resp?.assets[0];

    setIsUploading({
      loading: true,
      type: 'Uploading in progress.Please wait...',
    });
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.fileName,
          type: file.type,
        });
        const resp = await makeUploadApiRequest(formData);

        if (resp?.data?.error) {
          throw new Error('Cannot upload file. Please try again.');
        }
        if (resp?.data) {
          setUploadedDocument(resp?.data);
          return resp?.data;
        }
      } else {
        throw new Error('No file selected');
      }
    } catch (error) {
      errorToast({
        title: 'Error',
        body: 'Cannot upload file. Please try again',
      });
    } finally {
      setIsUploading({
        loading: false,
        type: null,
      });
    }
  };

  const pickDocument = async (cb = null) => {
    const resp = await launchImageLibrary();
    if (resp?.didCancel) {
      errorToast({
        title: 'SELECT DOC',
        body: 'Please select the document to continue',
      });
      return;
    }
    await handleUpload(resp).then(res => {
      cb && cb(res);
    });
  };

  const scanDocument = async (cb = null) => {
    const resp = await launchCamera({
      includeBase64: true,
    });
    if (resp?.didCancel) {
      return;
    }
    if (resp?.errorCode === 'camera_unavailable') {
      errorToast({
        title: 'Error',
        body: 'Cannot upload file. Camera is not available',
      });
      return;
    }
    if (resp?.errorCode === 'permission_denied') {
      errorToast({
        title: 'Error',
        body: 'Cannot upload file. Permission denied',
      });
      return;
    }
    await handleUpload(resp).then(res => {
      cb && cb(res);
    });
  };

  return {
    isUploading,
    uploadedDocument,
    uploadProgress,
    pickDocument,
    scanDocument,
  };
};
