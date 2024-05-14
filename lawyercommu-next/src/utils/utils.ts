/**
 * mysql insert시 ' 때문에 저장이 안됨
 * @param text HTML
 * @returns 치환된 텍스트
 */
export const escapeMySQL = (text: string) => {
  const map = {
    // mysql insert시 ' 때문에 저장이 안됨
    "'": "\\'",
  };

  return text.replace(/[']/g, (m) => map[m as keyof typeof map]);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  escapeMySQL,
};
