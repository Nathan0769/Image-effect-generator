"use client";

import satori from "satori";
import { ImageGenerator } from "@/src/imageGenerator";

let worker, pending;
if (typeof window !== "undefined") {
  worker = new Worker(new URL("./resvg-worker.js", import.meta.url));
  pending = new Map();

  worker.onmessage = (e) => {
    const { _id, arrayBuffer, success, error } = e.data;
    const resolve = pending.get(_id);
    if (resolve) resolve({ arrayBuffer, success, error });
    pending.delete(_id);
  };

  worker.onerror = (err) => {
    console.error("Worker error:", err);
  };
}

export async function renderPNG({ image, params }) {
  if (typeof window === "undefined") {
    throw new Error("renderPNG doit être appelé côté client");
  }
  if (!image.src) {
    throw new Error("Aucune image fournie");
  }

  const svg = await satori(<ImageGenerator params={params} image={image} />, {
    width: image.width,
  });

  const id = Math.random();
  const promise = new Promise((resolve) => pending.set(id, resolve));
  worker.postMessage({ _id: id, svg, width: image.width });

  const { arrayBuffer, success, error } = await promise;
  if (!success) {
    throw new Error("Worker failed: " + error);
  }

  return new Blob([arrayBuffer], { type: "image/png" });
}
