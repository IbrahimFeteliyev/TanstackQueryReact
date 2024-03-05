import React from "react";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";

const CreateCategory = () => {
  const [photoUrl, setPhotoUrl] = React.useState(null);
  const [categoryNames, setCategoryNames] = React.useState({
    az: "",
    en: "",
    ru: "",
  });
  const langCodes = ["az-AZ", "en-US", "ru-RU"];

  const handleChangeCategoryName = (lang, value) => {
    setCategoryNames((prevCategoryNames) => ({
      ...prevCategoryNames,
      [lang]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhotoUrl(file);
  };
  const mutation = useMutation(
    (formData) =>
      fetch("https://localhost:7245/api/Category/CreateCategory", {
        method: "POST",
        body: formData,
      }),
    {
      onSuccess: () => {
        // Navigate to the GetAll page after successful creation
        return <Navigate to="/getall" />;
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    langCodes.forEach((code, index) => {
      formData.append(`CategoryName[${index}]`, categoryNames[code.split("-")[0]]);
      formData.append(`LangCode[${index}]`, code);
    });
    formData.append("PhotoUrl", photoUrl);
  
    mutation.mutate(formData);
    setCategoryNames({
      az: "",
      en: "",
      ru: "",
    }); 
    setPhotoUrl(null);
  };

  return (
    <div>
      {mutation.isSuccess && <Navigate to="/getall" />}
      <form onSubmit={handleSubmit}>
        {langCodes.map((code) => (
          <label key={code}>
            {code} Category Name:
            <input
              required
              type="text"
              value={categoryNames[code.split("-")[0]]}
              onChange={(e) => handleChangeCategoryName(code.split("-")[0], e.target.value)}
            />
          </label>
        ))}
        <br />
        <label>
          Photo:
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </label>
        <br />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
