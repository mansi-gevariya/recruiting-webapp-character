import axios from 'axios';

const GITHUB_USERNAME = 'mansi-gevariya';

const API_URL = `https://recruiting.verylongdomaintotestwith.ca/api/{${GITHUB_USERNAME}}/character`;

/**
 * Saves character data to the API.
 * @param characterData - The JSON payload representing character data.
 * @returns The response data from the API.
 */
export const saveCharacter = async (characterData: any): Promise<any> => {
  try {
    const response = await axios.post(API_URL, characterData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error saving character:', error);
    throw error;
  }
};

/**
 * Retrieves the most recent character data from the API.
 * @returns The character data from the API.
 */
export const getCharacter = async (): Promise<any> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};
