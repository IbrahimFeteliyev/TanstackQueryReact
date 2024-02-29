import React from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const [count, setCount] = React.useState("");
  const [titles, setTitles] = React.useState({
    az: "",
    en: "",
    ru: "",
  });

  const { id } = useParams();
  const fetchData = useQuery(["ShortInfo", id], () =>
    fetch(`https://localhost:7245/api/ShortInfo/GetShortInfoById/${id}`)
      .then((response) => response.json())
      .then((data) => data.data)
  );

  const { data, isLoading } = fetchData;

  React.useEffect(() => {
    if (data) {
      setCount(data.count);
      setTitles({
        az: data.title[0],
        en: data.title[1],
        ru: data.title[2],
      });
    }
  }, [data]);

  const mutation = useMutation(
    () =>
      fetch(`https://localhost:7245/api/ShortInfo/UpdateShortInfo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count,
          createdDate: data.createdDate,
          updatedDate: new Date().toISOString(),
          title: [titles.az, titles.en, titles.ru],
        }),
      }),
    {
      onSuccess: () => {
        // Optionally, you can perform some action after the mutation is successful
        console.log("ShortInfo updated successfully");
        navigate("/getall");
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>ShortInfo Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} disabled />
        </label>
        <br />
        <label>
          Count:
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Az Title:
          <input
            type="text"
            value={titles.az}
            onChange={(e) => setTitles({ ...titles, az: e.target.value })}
          />
        </label>
        <br />
        <label>
          En Title:
          <input
            type="text"
            value={titles.en}
            onChange={(e) => setTitles({ ...titles, en: e.target.value })}
          />
        </label>
        <br />
        <label>
          Ru Title:
          <input
            type="text"
            value={titles.ru}
            onChange={(e) => setTitles({ ...titles, ru: e.target.value })}
          />
        </label>
        <br />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Updating..." : "Update ShortInfo"}
        </button>
      </form>
    </div>
  );
};

export default Detail;
