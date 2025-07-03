import * as resvg from "@resvg/resvg-wasm";

const wasmPath = new URL("@resvg/resvg-wasm/index_bg.wasm", import.meta.url);

void fetch(wasmPath).then((res) => resvg.initWasm(res));

self.addEventListener("message", (event) => {
  const { _id, svg, width } = event.data;

  try {
    const renderer = new resvg.Resvg(svg, {
      fitTo: {
        mode: "width",
        value: width,
      },
    });

    const image = renderer.render();
    const pngBuffer = image.asPng().buffer;

    self.postMessage({
      _id,
      arrayBuffer: pngBuffer,
      success: true,
    });
  } catch (error) {
    self.postMessage({
      _id,
      error: error.message,
      success: false,
    });
  }
});
