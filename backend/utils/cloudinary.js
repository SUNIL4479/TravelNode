import https from "https";

/**
 * Uploads a file buffer to Cloudinary using an unsigned upload preset
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} mimeType - The mime type of the file
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise<Object>} The Cloudinary response object
 */
const uploadToCloudinary = (fileBuffer, mimeType, folder = "payments") => {
  return new Promise((resolve, reject) => {
    const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return reject(new Error("Cloudinary configuration missing (Cloud Name or Upload Preset)"));
    }

    const base64Data = fileBuffer.toString("base64");
    const fileData = `data:${mimeType};base64,${base64Data}`;

    const postData = JSON.stringify({
      file: fileData,
      upload_preset: uploadPreset,
      folder: folder,
    });

    const options = {
      hostname: "api.cloudinary.com",
      path: `/v1_1/${cloudName}/image/upload`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(responseBody);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(parsed.error?.message || "Cloudinary upload failed"));
          }
        } catch (err) {
          reject(new Error("Failed to parse Cloudinary response"));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
};

export { uploadToCloudinary };
