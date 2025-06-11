import { useState } from "react";

type FallbackImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback: string;
};

function FallbackImage({ fallback, src, ...rest }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallback);
  };

  return (
    <img
      src={imgSrc}
      onError={handleError}
      {...rest}
    />
  );
}

export default FallbackImage;