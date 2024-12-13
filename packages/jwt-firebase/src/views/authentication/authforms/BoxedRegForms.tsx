import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";


const BoxedAuthRegister = () => {
  return (
    <>
      <form className="mt-6">
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            sizing="md"
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="emadd" value="Email Address" />
          </div>
          <TextInput
            id="emadd"
            type="text"
            sizing="md"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="userpwd" value="Password" />
            <Link className="text-xs text-primary" to={'/auth/auth2/forgot-password'}>Forgot Password ?</Link>
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" defaultChecked/>
            <Label
              htmlFor="accept"  
              className="font-medium cursor-pointer"
            >
              Keep me logged in
            </Label>
          </div>
        
        </div>
        <Button  to="/" as={Link} className="rounded-md w-full bg-sky dark:bg-sky  hover:bg-dark dark:hover:bg-dark">
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default BoxedAuthRegister;
