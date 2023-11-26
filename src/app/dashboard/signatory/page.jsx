import { SignatoryFile } from "@/components/local/SignatoryFile";
import { SignatoryUpload } from "@/components/local/SignatoryUpload";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Meneses | Signatory",
};

export const SignatoryPage = () => {
  return (
    <>
      <ToastContainer />

      <div className="flex flex-col gap-3">
        <div>
          <SignatoryUpload />
        </div>
        <div>
          <SignatoryFile />
        </div>
      </div>
    </>
  );
};

export default SignatoryPage;
