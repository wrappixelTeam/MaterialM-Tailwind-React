

import { Link } from "react-router";
import Logo from "src/layouts/full/shared/logo/Logo";
import AuthRegister from "../authforms/AuthRegister";
import SocialButtons from "../authforms/SocialButtons";
import LeftSidebarPart from "../LeftSidebarPart";

const Register = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen">
        <div className="grid grid-cols-12 gap-3 h-screen bg-white dark:bg-darkgray">
          <div className="xl:col-span-4 lg:col-span-4 col-span-12 bg-dark lg:block hidden relative overflow-hidden">
            <LeftSidebarPart />
          </div>
          <div className="xl:col-span-8 lg:col-span-8 col-span-12 sm:px-12 px-4">
            <div className="flex h-screen items-center px-3 max-w-[460px]  mx-auto">
              <div className="w-full">
                <Logo />
                <h3 className="text-2xl font-bold my-3">Sign Up</h3>
                <p className="text-darklink text-sm font-medium">
                  Your Admin Dashboard
                </p>
                <SocialButtons title="or sign up with" />
                <AuthRegister />
                <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-start">
                  <p>Already have an Account?</p>
                  <Link
                    to={"/auth/auth1/login"}
                    className="text-primary text-sm font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
