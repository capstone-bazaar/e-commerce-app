const getBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const isTokenExpired = (token: string) => {
  const tokenPayload = token.split('.')[1];
  const decodedPayload = atob(tokenPayload);
  const { exp } = JSON.parse(decodedPayload);
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};

export { getBase64, isTokenExpired };
