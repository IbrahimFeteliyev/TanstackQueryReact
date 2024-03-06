import React from "react";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";

const CreateHospital = () => {
  const [coverPhoto, setCoverPhoto] = React.useState(null);
  const [branchNames, setBranchNames] = React.useState({
    az: "",
    en: "",
    ru: "",
  });
  const [hospitalNames, setHospitalNames] = React.useState({
    az: "",
    en: "",
    ru: "",
  });
  const [descriptions, setDescriptions] = React.useState({
    az: "",
    en: "",
    ru: "",
  });
  const [features, setFeatures] = React.useState([
    {
      number: "",
      featureDescription: { az: "", en: "", ru: "" },
      featurePhoto: null,
    },
  ]);
  const [photoUrls, setPhotoUrls] = React.useState([]);

  const langCodes = ["az-AZ", "en-US", "ru-RU"];

  const handleChangeBranchName = (lang, value) => {
    setBranchNames((prevBranchNames) => ({
      ...prevBranchNames,
      [lang]: value,
    }));
  };

  const handleChangeHospitalName = (lang, value) => {
    setHospitalNames((prevHospitalNames) => ({
      ...prevHospitalNames,
      [lang]: value,
    }));
  };

  const handleChangeDescription = (lang, value) => {
    setDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [lang]: value,
    }));
  };

  const handlePhotosFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotoUrls(files);
  };
  
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCoverPhoto(file);
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    setFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      {
        number: "",
        featureDescription: { az: "", en: "", ru: "" },
        featurePhoto: null,
      },
    ]);
  };

  const mutation = useMutation(
    (formData) =>
      fetch("https://localhost:7245/api/HospitalBranch/CreateHospitalBranch", {
        method: "POST",
        body: formData,
      }),
    {
      onSuccess: () => {
        // Navigate to the GetAllHospital page after successful creation
        return <Navigate to="/getall" />;
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    langCodes.forEach((code, index) => {
      formData.append(`BranchName[${index}]`, branchNames[code.split("-")[0]]);
      formData.append(`HospitalName[${index}]`, hospitalNames[code.split("-")[0]]);
      formData.append(`Description[${index}]`, descriptions[code.split("-")[0]]);
      formData.append(`LangCode[${index}]`, code); 
    });
    formData.append("CoverPhoto", coverPhoto);
    photoUrls.forEach((file) => {
      formData.append(`PhotoUrl`, file);
    });
    features.forEach((feature, index) => {
      formData.append(`HospitalBranchFeatures[${index}].Number`, feature.number);
      langCodes.forEach((code, langIndex) => {
        formData.append(`HospitalBranchFeatures[${index}].FeatureDescription[${langIndex}]`, feature.featureDescription[code.split("-")[0]]);
      });
      formData.append(`HospitalBranchFeatures[${index}].FeaturePhotoUrl`, feature.featurePhoto);
    });

    // Add empty HospitalBranchFeatures array if no features are provided
    if (features.length === 0) {
      formData.append("HospitalBranchFeatures", "[]");
    }

    mutation.mutate(formData);

    setCoverPhoto(null);
    setBranchNames({ az: "", en: "", ru: "" });
    setHospitalNames({ az: "", en: "", ru: "" });
    setDescriptions({ az: "", en: "", ru: "" });
    setFeatures([{ number: "", featureDescription: { az: "", en: "", ru: "" }, featurePhoto: null }]);
  };

  return (
    <div>
      {mutation.isSuccess && <Navigate to="/getall" />}
      <form onSubmit={handleSubmit}>
        {langCodes.map((code) => (
          <div key={code}>
            <label>
              {code} Branch Name:
              <input
                required
                type="text"
                value={branchNames[code.split("-")[0]]}
                onChange={(e) =>
                  handleChangeBranchName(code.split("-")[0], e.target.value)
                }
              />
            </label>
            <label>
              {code} Hospital Name:
              <input
                required
                type="text"
                value={hospitalNames[code.split("-")[0]]}
                onChange={(e) =>
                  handleChangeHospitalName(code.split("-")[0], e.target.value)
                }
              />
            </label>
            <label>
              {code} Description:
              <textarea
                required
                value={descriptions[code.split("-")[0]]}
                onChange={(e) =>
                  handleChangeDescription(code.split("-")[0], e.target.value)
                }
              />
            </label>
          </div>
        ))}
        <label>
          Photos:
          <input
            type="file"
            onChange={handlePhotosFileChange}
            multiple
            accept="image/*"
          />
        </label>
        <label>
          Cover Photo:
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </label>
        {features.map((feature, index) => (
          <div key={index}>
            <label>
              Feature {index + 1} Number:
              <input
                required
                type="text"
                value={feature.number}
                onChange={(e) =>
                  handleFeatureChange(index, "number", e.target.value)
                }
              />
            </label>
            {langCodes.map((code) => (
              <label key={code}>
                {code} Feature {index + 1} Description:
                <input
                  required
                  type="text"
                  value={feature.featureDescription[code.split("-")[0]]}
                  onChange={(e) =>
                    handleFeatureChange(index, "featureDescription", {
                      ...feature.featureDescription,
                      [code.split("-")[0]]: e.target.value,
                    })
                  }
                />
              </label>
            ))}
            <label>
              Feature {index + 1} Photo:
              <input
                type="file"
                onChange={(e) =>
                  handleFeatureChange(index, "featurePhoto", e.target.files[0])
                }
                accept="image/*"
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddFeature}>
          Add Feature
        </button>
        <br />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Creating..." : "Create Hospital"}
        </button>
      </form>
    </div>
  );
};

export default CreateHospital;
