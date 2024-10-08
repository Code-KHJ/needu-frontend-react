import ico_profile from "@/assets/images/ico_login_gray.png";

interface ProfileImageProps {
  src: string | null | undefined;
}
const ProfileImage: React.FC<ProfileImageProps> = ({ src }) => {
  return (
    <img
      src={src ? src : ico_profile}
      alt="profile"
      style={{
        borderRadius: "50%",
      }}
    />
  );
};

export default ProfileImage;
