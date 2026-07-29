import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export async function uploadImage(fileBase64: string): Promise<string> {
  const result = await cloudinary.uploader.upload(fileBase64, {
    folder: "gather_blog",
  });
  return result.secure_url;
}
