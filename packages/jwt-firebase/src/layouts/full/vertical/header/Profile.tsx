import { Icon } from "@iconify/react";
import { Badge, Dropdown } from "flowbite-react";
import * as profileData from "./Data";
import SimpleBar from "simplebar-react";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "/src/assets/images/profile/user-1.jpg"
import useMounted from "@src/guards/authGuard/UseMounted";
import useAuth from "@src/guards/authGuard/UseAuth";
const Profile = () => {
  const mounted = useMounted();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative ">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] pb-4 rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex items-center gap-1">
            <span className="h-10 w-10 hover:text-primary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              <img
                src={profileImg}
                alt="logo"
                height="35"
                width="35"
                className="rounded-full"
              />
            </span>
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="hover:text-primary dark:text-primary group-hover/menu:text-primary"
              height={12}
            />
          </div>
        )}
      >
        <div className="px-6">
          <div className="flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3">
            <img
              src={profileImg}
              alt="logo"
              height="56"
              width="56"
              className="rounded-full"
            />
            <div>
              <h5 className="text-15 font-semibold">
                David McMichael <span className="text-success">Pro</span>
              </h5>
              <p className="text-sm text-ld opacity-80">info@MatDash.com</p>
            </div>
          </div>
        </div>
        <SimpleBar>
          {profileData.profileDD.map((items, index) => {
            if (items.title === "Sign Out") {
              return (
                <div key={index} className="px-6 mb-2" onClick={handleLogout}>
                  <Dropdown.Item
                    className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md"
                    key={index}
                  >
                    <div className="flex items-center w-full ">
                      <div className=" flex gap-3 w-full ">
                        <h5 className="text-15 font-normal group-hover/link:text-primary">
                          {items.title}
                        </h5>
                        {items.url == "/apps/invoice" ? (
                          <Badge color={"lightprimary"}>4</Badge>
                        ) : null}
                      </div>
                    </div>
                  </Dropdown.Item>
                </div>
              )
            }
            return (
              <div key={index} className="px-6 mb-2">
                <Dropdown.Item
                  as={Link}
                  to={items.url}
                  className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md"
                  key={index}
                >
                  <div className="flex items-center w-full ">
                    <div className=" flex gap-3 w-full ">
                      <h5 className="text-15 font-normal group-hover/link:text-primary">
                        {items.title}
                      </h5>
                      {items.url == "/apps/invoice" ? (
                        <Badge color={"lightprimary"}>4</Badge>
                      ) : null}
                    </div>
                  </div>
                </Dropdown.Item>
              </div>
            )
          })}
        </SimpleBar>
      </Dropdown>
    </div>
  );
};

export default Profile;
