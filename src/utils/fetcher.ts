export const fetcher = async (apiURL: string, options = {}) => {
  const fetchOptions = {
    method: 'GET',
    ...options,
  };

  try {
    const response = await fetch(apiURL, fetchOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json().then((responseData) => {
      return responseData.data;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
