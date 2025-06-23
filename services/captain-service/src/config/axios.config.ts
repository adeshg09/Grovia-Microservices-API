import axios, { AxiosInstance } from "axios";
import { envConfig } from "./env.config";

// Function to create a client with token injection logic
const createClientWithToken = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
  });

  return {
    get: (url: string, token: string, config: any = {}) =>
      instance.get(url, {
        ...config,
        headers: {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      }),

    post: (url: string, data: any, token: string, config: any = {}) =>
      instance.post(url, data, {
        ...config,
        headers: {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      }),

    put: (url: string, data: any, token: string, config: any = {}) =>
      instance.put(url, data, {
        ...config,
        headers: {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      }),

    delete: (url: string, token: string, config: any = {}) =>
      instance.delete(url, {
        ...config,
        headers: {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

// Export clients for each service
export const authClient = createClientWithToken(envConfig.AUTH_SERVICE_URL);
export const customerClient = createClientWithToken(
  envConfig.CUSTOMER_SERVICE_URL
);
export const adminClient = createClientWithToken(envConfig.ADMIN_SERVICE_URL);
export const inventoryClient = createClientWithToken(
  envConfig.INVENTORY_SERVICE_URL
);

export const aadhaarClient = createClientWithToken(
  envConfig.SANDBOX_CONFIG.baseURL
);
