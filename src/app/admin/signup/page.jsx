import { Register } from "@/components/admin-components/local/Register";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Meneses | Admin Register",
};

export const SignupPageAdmin = () => {
  return (
    <>
      <ToastContainer />
      <Register />
    </>
  );
};

export default SignupPageAdmin;
