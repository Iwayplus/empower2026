import { useEffect, useState } from "react";

const FOLDER_ID = "1sHU7aS6AIFwb7cgXFbjvX_0LZ9p7St-2";
const API_KEY = "AIzaSyCNFkFdguS-lB0y8DKPRGJl1BLVWlZz1QM";

export default function useDriveImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadImages() {
      try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image'&key=${API_KEY}&fields=files(id,name)`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.files) {
          console.error("No images returned", data);
          return;
        }

        const imgUrls = data.files.map(
          (f) => `https://drive.google.com/thumbnail?id=${f.id}&sz=w1000`
        );

        setImages(imgUrls);
      } catch (err) {
        console.error("Drive API Error", err);
      }
    }

    loadImages();
  }, []);

  return images;
}
