import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';
import ApiServiceSingleton from '@services/singletons/ApiServiceSingleton';

export const TOKEN_TOAST_ID = 'TOKEN_TOAST_ID';

export function useToast() {
  const toast = useChakraToast();

  return {
    toast(options: UseToastOptions) {
      const isTokenMessage =
        ApiServiceSingleton.getInstance().TOKEN_ERROR_MESSAGES.includes(
          options.description.toString(),
        );
      const newOptions = { ...options };

      if (isTokenMessage) newOptions.id = TOKEN_TOAST_ID;

      if (toast.isActive(newOptions.id)) return undefined;

      return toast(newOptions);
    },
  };
}
