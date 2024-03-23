import cloudinary from "@/../cloudinary.config";
import { unlink, writeFile } from "fs/promises";

export async function uploadImage(image: File) {
    const path = `./src/app/api/upload/${image.name}`;
    const result = await cloudinary.uploader.upload(path, { public_id: "WebData/Metastasiss/CollegeId/" + image.name + Date.now() });
    return result.secure_url;
}