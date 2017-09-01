/* global fetch */
import camelize from 'camelize';

const callApi = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return { error: await response.text() };
    }

    return {
      error: null,
      json: camelize(await response.json()),
    };
  } catch (error) {
    return { error: error.toString() };
  }
};

export default callApi;
