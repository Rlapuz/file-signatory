import { SignatoryFile } from "@/components/local/SignatoryFile";
import { SignatoryUpload } from "@/components/local/SignatoryUpload";

export const metadata = {
  title: "Meneses | Signatory",
};

export const SignatoryPage = () => {
  return (
    <>
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
