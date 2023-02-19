import { DefaultAvatar } from "../../api/constants";

export const Avatar = ({
  src,
  alt,
  className = "w-xxl rounded-full h-xxl",
  height,
  width,
}: {
  src?: string;
  alt: string;
  className?: string;
  height?: number | string;
  width?: number | string;
}) => {
  return (
    <img
      src={!!src ? src : DefaultAvatar}
      alt={alt}
      className={className}
      height={height}
      width={width}
    />
  );
};

export default Avatar;
