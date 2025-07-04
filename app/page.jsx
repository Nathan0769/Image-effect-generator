"use client";

import { useState } from "react";
import { ImageGenerator } from "@/src/imageGenerator";
import { renderPNG } from "./render-png.client";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ width: 100, height: 100, src: null });
  const [params, setParams] = useState({
    padding: 0,
    borderRadius: 20,
    shadow: 25,
  });

  const convertFileBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner un fichier image (JPG, PNG, etc.)");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () =>
        setImage({
          src: img.src,
          width: img.width,
          height: img.height,
          name: file.name,
        });
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await renderPNG({ image, params });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "image-elevation.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur renderPNG:", err);
      alert("Erreur lors de la génération de l'image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen p-4 lg:p-8 gap-4 lg:gap-8">
      {/* ← Colonne de gauche */}
      <div className="w-full lg:w-1/2  flex items-start justify-center pt-8 lg:pt-16">
        <div className="card bg-base-200 rounded-box w-80 shadow-lg">
          <div className="card-body p-6 space-y-4">
            <h2 className="card-title">Settings</h2>

            {/* File input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">File</span>
              </label>
              <input
                type="file"
                className="file-input file-input-primary file-input-bordered w-full"
                onChange={convertFileBase64}
              />
            </div>

            {/* Padding */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Padding</span>
              </label>
              <input
                type="range"
                min={0}
                max={99}
                value={params.padding}
                onChange={(e) =>
                  setParams({ ...params, padding: Number(e.target.value) })
                }
                className="range range-primary"
              />
            </div>

            {/* Border Radius */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Border Radius</span>
              </label>
              <input
                type="range"
                min={0}
                max={99}
                value={params.borderRadius}
                onChange={(e) =>
                  setParams({ ...params, borderRadius: Number(e.target.value) })
                }
                className="range range-primary"
              />
            </div>

            {/* Shadow */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Shadow</span>
              </label>
              <input
                type="range"
                min={0}
                max={99}
                value={params.shadow}
                onChange={(e) =>
                  setParams({ ...params, shadow: Number(e.target.value) })
                }
                className="range range-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-1">
        <div className="inline-block h-[100px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
      </div>

      {/* → Colonne Preview */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col items-center justify-start min-h-screen mt-8">
        <div className="flex mb-4 items-center justify-center w-full max-h-[650px] pt-4 mt-8">
          <div className="w-full max-w-[400px] max-h-[400px]">
            <ImageGenerator image={image} params={params} />
          </div>
        </div>
        <button
          className="btn btn-primary"
          disabled={!image.src || loading}
          onClick={handleDownload}
        >
          {loading ? (
            <span className="loading loading-spinner text-white"></span>
          ) : (
            "Download"
          )}
        </button>
      </div>
    </div>
  );
}
