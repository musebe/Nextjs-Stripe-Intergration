import { v2 as cloudinary } from "cloudinary";

// Initialize the cloudinary SDK using cloud name, api key and api secret
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Uploads a file to cloudinary
 * @param {File} file
 * @returns
 */
export const handleCloudinaryUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        // Type of resource. We leave it to cloudinary to determine but on the front end we only allow images and videos
        resource_type: "auto",
        // Only allow these formats
        allowed_formats: ["jpg", "png"],
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }
    );
  });
};
