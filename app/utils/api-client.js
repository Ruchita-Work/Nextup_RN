/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
export const baseUrl = `http://52.32.19.152:8081/v1`;

async function client(
  endpoint,
  {
    apiURL = baseUrl,
    data,
    token,
    headers: customHeaders,
    ...customConfig
  } = {},
) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (data) {
    headers['Content-Type'] = 'application/json';
  }
  const config = {
    method: data ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customHeaders,
    },
  };
  if (data) {
    config.body = JSON.stringify(data);
  }
  try {
    const url = `${apiURL}/${endpoint}`;

    const response = await fetch(url, config);

    if (response.status === 401) {
      // await logout();
      // Handle navigation differently in React Native
      // Example: navigation.navigate('Login');
      throw new Error('Please re-authenticate.');
    }
    if (response.status === 204) {
      return 'Delete successfully';
    }

    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }

    throw responseData;
  } catch (error) {
    console.log('error', error);
    const obj = {
      ...error,
      message: error?.message ?? 'Something went wrong.',
    };
    return Promise.reject(obj);
  }
}

export { client };
