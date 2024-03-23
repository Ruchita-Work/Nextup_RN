/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';
import { client } from '../utils/api-client'; // Import your axiosInstance

function useClient() {
  const token = null;

  return React.useCallback(
    async (endpoint, config) => client(endpoint, { ...config, token }),
    [token],
  );
}

export { useClient };
