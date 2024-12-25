
import { UserDataProvider } from "src/context/UserDataContext";
import Introduction from "./Introduction";
import Photos from "./Photos";
import Post from "./Post";
import ProfileBanner from "./ProfileBanner";


const UserProfileApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-[30px]">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="grid grid-cols-12 gap-[30px]">
              {/* Introduction */}
              <div className="col-span-12">
                <Introduction />
              </div>
              {/* Photos */}
              <div className="col-span-12">
                <Photos />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <Post />
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default UserProfileApp;
