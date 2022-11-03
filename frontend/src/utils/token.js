const TOKEN = "jwtToken";

export const getToken = () => (
    localStorage.getItem(TOKEN)
);

export const setToken = (token) => (
    localStorage.setItem(TOKEN, token)
)

export const deleteToken = () => {
    localStorage.removeItem(TOKEN);
}