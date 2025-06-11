import { useState, type CSSProperties } from "react";

interface FallbackImageProps {
  src: string;
  fallback: string;
  alt: string;
  style?: CSSProperties;
}

function FallbackImage({ src, fallback, alt, style }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallback);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={style}
    />
  );
}

export default FallbackImage;