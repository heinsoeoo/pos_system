const USER = "user";

export const getUser = () => (
    localStorage.getItem(USER)
);

export const setUser = (value) => (
    localStorage.setItem(USER, value)
)


export const deleteUser = () => {
    localStorage.removeItem(USER);
}