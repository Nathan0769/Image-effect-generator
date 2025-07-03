"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable x-a11y/alt-text */
export const ImageGenerator = ({ image, params }) => {
  if (!image.src) {
    return (
      <div role="alert" className="alert alert-vertical sm:alert-horizontal">
        <span>Please select an image !</span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        padding: `${params.padding}px`,
        boxSizing: "border-box",
        background: "transparent",
      }}
    >
      <img
        src={image.src}
        alt="preview"
        style={{
          display: "block",
          borderRadius: `${params.borderRadius}px`,
          boxShadow: `0 0 ${params.shadow}px rgba(0,0,0,0.8)`,
          objectFit: "contain",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
};
