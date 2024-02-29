import React from "react";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";

const Create = () => {
  const [count, setCount] = React.useState("");
  const [titles, setTitles] = React.useState({
    az: "",
    en: "",
    ru: "",
  });
  const langCodes = ["az-AZ", "en-US", "ru-RU"];

  const handleChangeCount = (event) => {
    setCount(event.target.value);
  };

  const handleChangeTitle = (lang, value) => {
    setTitles((prevTitles) => ({
      ...prevTitles,
      [lang]: value,
    }));
  };

  const mutation = useMutation(
    () =>
      fetch("https://localhost:7245/api/ShortInfo/CreateShortInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count,
          title: langCodes.map((code) => titles[code.split("-")[0]]),
          langCode: langCodes,
        }),
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
    mutation.mutate();
    setCount(""); // Reset count
    setTitles({
      az: "",
      en: "",
      ru: "",
    }); // Reset titles
  };

  return (
    <div>
      {mutation.isSuccess && <Navigate to="/getall" />}
      <form onSubmit={handleSubmit}>
        <label>
          Count:
          <input type="text" value={count} onChange={handleChangeCount} required />
        </label>
        <br />
        {langCodes.map((code) => (
          <label key={code}>
            {code} Title:
            <input
              required
              type="text"
              value={titles[code.split("-")[0]]}
              onChange={(e) => handleChangeTitle(code.split("-")[0], e.target.value)}
            />
          </label>
        ))}
        <br />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Creating..." : "Create ShortInfo"}
        </button>
      </form>
    </div>
  );
};

export default Create;
