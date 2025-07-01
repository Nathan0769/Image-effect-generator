"use client";
import { useState } from "react";

const Settings = ({ params, setParams, image, setImage }) => {
  const convertFileBase64 = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () =>
        setImage({
          src: img.src,
          width: img.width,
          height: img.height,
          name: fileName,
        });
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-gray-100 p-4 rounded-lg">
      <h1 className="font-bold">Settings</h1>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Padding</span>
        </div>
        <input
          type="file"
          className="file-input cursor-pointer file-input-primary"
          onChange={convertFileBase64}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Padding</span>
        </div>
        <input
          type="range"
          min={0}
          max="99"
          value={params.padding}
          onChange={(e) =>
            setParams({ ...params, padding: Number(e.target.value) })
          }
          className="range range-red range-sm"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Border-Radius</span>
        </div>
        <input
          type="range"
          min={0}
          max="99"
          value={params.borderRadius}
          onChange={(e) =>
            setParams({ ...params, borderRadius: Number(e.target.value) })
          }
          className="range range-primary range-sm"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Shadow</span>
        </div>
        <input
          type="range"
          min={0}
          max="99"
          value={params.shadow}
          onChange={(e) =>
            setParams({ ...params, shadow: Number(e.target.value) })
          }
          className="range range-primary range-sm"
        />
      </label>
    </div>
  );
};

export const AllParams = () => {
  const [image, setImage] = useState({ width: 100, height: 100, src: "" });
  const [params, setParams] = useState({
    padding: 35,
    borderRadius: 20,
    shadow: 25,
  });

  return (
    <div className="">
      <Settings
        params={params}
        setParams={setParams}
        image={image}
        setImage={setImage}
      ></Settings>
    </div>
  );
};
