import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

const GetAll = () => {
  const { t, i18n } = useTranslation();
  const activeLang = i18n.language;

  const queryClient = useQueryClient();
  const fetchData = useQuery(["ShortInfo",activeLang], () =>
    fetch(`https://localhost:7245/api/ShortInfo?langCode=${activeLang}`).then((response) =>
      response.json()
    )
  );

  const { data, isLoading } = fetchData;

  const mutation = useMutation(
    (id) =>
      fetch(`https://localhost:7245/api/ShortInfo/RemoveShortInfoById/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ShortInfo");
      },
    }
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>ShortInfo List</h1>
      <h1>{t("welcome")}</h1>
      <ul>
        {data?.data?.map((item) => (
          <li className="d-flex" key={item.id}>
            <span className="mr-5 border border-primary">{item.title}</span>
            <button><Link to={`/detail/${item.id}`}>Update</Link></button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAll;
