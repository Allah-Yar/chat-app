import CryptoJS from 'crypto-js';

export const generateKey = () => {
  return CryptoJS.lib.WordArray.random(16).toString();
};
