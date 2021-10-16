function tokenChecker(decodedToken) {
  const currentTime = parseInt(Date.now() / 1000);
  const tokenExpTime = decodedToken.exp;
  const result = tokenExpTime - currentTime;

  if (result < 0) return false;
  else return true;
}

export default tokenChecker;
