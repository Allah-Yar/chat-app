import localforage from 'localforage';
import CryptoJS from 'crypto-js';
import { getSharedKey } from './sharedKey';

const STORAGE_KEY = 'chatHistory';

// Encrypt with optional shared key
const encrypt = (text) => {
  const key = getSharedKey() || 'default-secret-key';
  return CryptoJS.AES.encrypt(text, key).toString();
};

// Decrypt with optional shared key
const decrypt = (cipher) => {
  const key = getSharedKey() || 'default-secret-key';
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveMessage = async (message) => {
  const stored = await getRawMessages();
  const encryptedMessage = {
    data: encrypt(JSON.stringify(message)),
    timestamp: new Date().toISOString(),
  };
  stored.push(encryptedMessage);
  await localforage.setItem(STORAGE_KEY, stored);
};

export const getRawMessages = async () => {
  return (await localforage.getItem(STORAGE_KEY)) || [];
};

export const getMessages = async () => {
  const encrypted = await getRawMessages();
  return encrypted.map((item) => {
    try {
      return JSON.parse(decrypt(item.data));
    } catch {
      return { text: '[decryption failed]' };
    }
  });
};

export const clearOldMessages = async (minutes = 60) => {
  const now = new Date();
  const stored = await getRawMessages();
  const filtered = stored.filter((item) => {
    const diff = (now - new Date(item.timestamp)) / 60000;
    return diff < minutes;
  });
  await localforage.setItem(STORAGE_KEY, filtered);
};

export const exportChatHistory = async () => {
  const messages = await getMessages();
  const blob = new Blob([JSON.stringify(messages, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat_export_${Date.now()}.json`;
  a.click();
};

export const importChatHistory = async (jsonFile) => {
  const text = await jsonFile.text();
  const parsedMessages = JSON.parse(text);
  const encryptedMessages = parsedMessages.map((msg) => ({
    data: encrypt(JSON.stringify(msg)),
    timestamp: new Date().toISOString(),
  }));

  const current = await getRawMessages();
  const combined = [...current, ...encryptedMessages];
  await localforage.setItem(STORAGE_KEY, combined);
};
