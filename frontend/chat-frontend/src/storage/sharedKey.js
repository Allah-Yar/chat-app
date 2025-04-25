export const setSharedKey = (key) => {
    localStorage.setItem('sharedKey', key);
  };
  
  export const getSharedKey = () => {
    return localStorage.getItem('sharedKey');
  };
  