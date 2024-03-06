import React from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const GetAllHospitalBranch = () => {
  const { t, i18n } = useTranslation();
  const activeLang = i18n.language;

  const fetchData = useQuery(["HospitalBranch", activeLang], () =>
    fetch(
      `https://localhost:7245/api/HospitalBranch?langCode=${activeLang}`
    ).then((response) => response.json())
  );

  const { data, isLoading } = fetchData;

  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid text-white py-5">
      <h1 className="text-center">HospitalBranch List</h1>
      <h1 className="text-center">{t("welcome")}</h1>
      {data?.data?.map((item) => (
        <div key={item.id} className="my-5">
          <h2>branchName: {item.branchName}</h2>
          <p>description: {item.description}</p>
          <img width={300}
            className="img-fluid"
            src={`https://localhost:7245/${item.coverPhoto}`}
            alt="Cover"
          />
          <h3>Photos:</h3>
          <ul className="d-flex">
            {item.photoUrl.map((photo, index) => (
              <li key={index}>
                <img 
                  className="img-fluid"
                  src={`https://localhost:7245/${photo}`}
                  alt={`Photo ${index}`}
                />
              </li>
            ))}
          </ul>
          <h3>Features:</h3>
          <ul>
            {item.features.map((feature, index) => (
              <li key={index}>
                <span>featureDescription: {feature.featureDescription}</span>
                <br />
                <span>number: {feature.number}</span>
                <br />
                <span>
                  Image:{" "}
                  <img
                    className="img-fluid"
                    src={`https://localhost:7245/${feature.featurePhotoUrl}`}
                    alt="Cover"
                  />
                </span>
                <br />
                <br />
                <br />
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default GetAllHospitalBranch;
