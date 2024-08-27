import axios from 'axios';

interface ProviderInfo {
  title?: string;
  [key: string]: unknown;
}

let providersList: string[] | null = null;
const cachedProviderDetails: { [key: string]: ProviderInfo[] } = {};

export const fetchProvidersList = async (): Promise<string[]> => {
  if (providersList) return providersList;
  try {
    const response = await axios.get<{ data: string[] }>(
      `https://api.apis.guru/v2/providers.json`,
    );
    providersList = response?.data?.data || [];
    // console.log(providersList);
    return providersList;
  } catch (error) {
    console.error('Error fetching providers list:', error);
    return [];
  }
};

export const fetchProviderDetails = async (
  provider: string,
): Promise<ProviderInfo[]> => {
  if (cachedProviderDetails[provider]) return cachedProviderDetails[provider];
  try {
    const response = await axios.get<{
      apis: { [key: string]: { info: ProviderInfo } };
    }>(`https://api.apis.guru/v2/${provider}.json`);
    const apis = response?.data?.apis;
    const providerDetails = apis
      ? Object.values(apis).map(api => api.info)
      : [];
    cachedProviderDetails[provider] = providerDetails;
    console.log(providerDetails);
    return providerDetails;
  } catch (error) {
    console.error(`Error fetching details for provider ${provider}:`, error);
    return [];
  }
};
