interface authToken {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
export const setAuthenticationToken = ({ token }: authToken) => {
  if (typeof window !== "undefined") {
    // console.log("setAuthenticationToken", token);
    localStorage.setItem("eden_access_token", token.accessToken);
  }
};

export const getAuthenticationToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("eden_access_token");
    return token;
  }
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("eden_refresh_token");
    return token;
  }
};

export const removeAuthenticationToken = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("eden_access_token");
    localStorage.removeItem("eden_refresh_token");
    sessionStorage.clear();
  }
};
