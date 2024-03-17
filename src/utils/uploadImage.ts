import cloudinary from "@/../cloudinary.config";
import { unlink, writeFile } from "fs/promises";

export async function uploadImage(image: File) {
    // Make buffer and store file to local storage
    const bufferData = await image.arrayBuffer();
    const buffer = Buffer.from(bufferData);
    console.log(__dirname);
    const path = `./src/app/api/upload/${image.name}`;
    await writeFile(path, buffer);

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(path, { public_id: "WebData/Metastasiss/CollegeId/" + image.name + Date.now() });
    console.log(result);

    // Delete the localfile
    await unlink(path);

    return result.secure_url;
}