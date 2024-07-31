import { getImageSearchResult } from '@/api/search';
import { StatusCodes } from 'http-status-codes';
import useMountedState from './useMountedState';

export type searchResponse = {
  result: {
    cb_url: string;
    city: string;
    combined_stock_symbols: string;
    country_code: string;
    domain: string;
    facebook_url: string;
    homepage_url: string;
    linkedin_url: string;
    logo_url: string;
    name: string;
    primary_role: string;
    region: string;
    document: string;
    twitter_url: string;
    type: string;
    uuid: string;
    image_url: string;
    title: string;
    price: string;
    product_url: string
  }[];
};

export const useGetImageSearchResult = () => {
  const [data, setData] = useMountedState<searchResponse | null>(null);
  const [error, setError] = useMountedState<string | null>(null);
  const [loading, setLoading] = useMountedState<boolean>(false);

  const getImageSearch = async (imageFile: File) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getImageSearchResult(imageFile);

      switch (res.status) {
        case StatusCodes.OK: {
          const searchRes = res.data;
          setData(searchRes);
          break;
        }
        default: {
          setError('Failed to get Search Result');
        }
      }
    } catch (err) {
      console.error('Image search error:', err);
      setError('Failed to get Search Result');
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setData(null);
  };

  return { data, error, loading, getImageSearch, resetData };
};