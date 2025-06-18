import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";

function CloudinaryUploadWidget({ onUpload }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    }
  }, [loaded]);

  const initializeWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "di3g3aqat",
          uploadPreset: "MBRBtest",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const fullUrl = `https://res.cloudinary.com/di3g3aqat/image/upload/${result.info.public_id}`;
            onUpload(fullUrl); // Pass the full URL back to parent
          }
        }
      );

      myWidget.open();
    }
  };

  return <Button onClick={initializeWidget}>Upload Image</Button>;
}

export default CloudinaryUploadWidget;
