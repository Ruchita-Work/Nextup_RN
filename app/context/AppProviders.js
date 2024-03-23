import React from 'react';
import { MutationCache, QueryCache } from 'react-query';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import ErrorBoundary from 'react-native-error-boundary';
import { Button, View, Text, Toast } from 'react-native-ui-lib';
import { customTheme } from '../constants';
import { errorToast } from '../utils/toast';

const mutationCache = new MutationCache({
  onError(error) {
    errorToast({
      title: 'Error',
      body: error?.message,
    });
  },
});

const queryCache = new QueryCache({
  onError(error) {
    errorToast({
      title: 'Error',
      body: error?.message,
    });
  },
});

// Create a client
const queryClient = new QueryClient({
  mutationCache,
  queryCache,
  defaultOptions: { queries: { retry: 2 } },
});

const CustomToast = ({ isVisible, onDismiss }) => (
  <Toast visible={isVisible} position={'top'} autoDismiss={5000} />
);

const ErrorFallback = props => (
  <View
    center
    centerV
    centerH
    flex
    backgroundColor={customTheme.colors.background}>
    <Text white marginV-12>
      Something happened!
    </Text>
    <Text white marginV-12>
      {props.error.toString()}
    </Text>
    <Button
      onPress={props?.reset}
      label="Try again"
      backgroundColor={customTheme.colors.blue20}
    />
  </View>
);

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            FallbackComponent={props => (
              <ErrorFallback reset={reset} {...props} />
            )}>
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
