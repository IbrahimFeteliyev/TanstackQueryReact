import React from "react";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";

const AboutCreate = () => {
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [contents, setContents] = React.useState({
    az: "",
    en: "",
    ru: "",
  });
  const langCodes = ["az-AZ", "en-US", "ru-RU"];

  const handleChangePhotoUrl = (event) => {
    setPhotoUrl(event.target.value);
  };

  const handleChangeContent = (lang, value) => {
    setContents((prevContents) => ({
      ...prevContents,
      [lang]: value,
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://localhost:7245/api/About/uploadimage", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.message;
  };

  const mutation = useMutation(
    async () => {
      const uploadedPhotoUrl = await uploadImage(photoUrl);
      return fetch("https://localhost:7245/api/About/CreateAbout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoUrl: uploadedPhotoUrl,
          content: langCodes.map((code) => contents[code.split("-")[0]]),
          langCode: langCodes,
        }),
      });
    },
    {
      onSuccess: () => {
        // Navigate to the About page after successful creation
        return <Navigate to="/about" />;
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
    setPhotoUrl(""); // Reset photoUrl
    setContents({
      az: "",
      en: "",
      ru: "",
    }); // Reset contents
  };

  return (
    <div>
      {mutation.isSuccess && <Navigate to="/about" />}
      <form onSubmit={handleSubmit}>
        <label>
          Photo URL:
          <input type="file" onChange={(e) => setPhotoUrl(e.target.files[0])} required />
        </label>
        <br />
        {langCodes.map((code) => (
          <label key={code}>
            {code} Content:
            <input
              required
              type="text"
              value={contents[code.split("-")[0]]}
              onChange={(e) => handleChangeContent(code.split("-")[0], e.target.value)}
            />
          </label>
        ))}
        <br />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Creating..." : "Create About"}
        </button>
      </form>
    </div>
  );
};

export default AboutCreate;
