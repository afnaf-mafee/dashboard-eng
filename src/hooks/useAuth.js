import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  return {
    user: auth?.user,
    token: auth?.token,

    name: auth?.user?.name || "",
    email: auth?.user?.email || "",
    role: auth?.user?.role || "",

    isAuthenticated: !!auth?.token,
  };
};

export default useAuth;