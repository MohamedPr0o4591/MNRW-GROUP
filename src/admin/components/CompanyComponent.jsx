import React, { useEffect, useState } from "react";
import "./components.css";
import { useDispatch, useSelector } from "react-redux";
import { get_all_categories, get_companies } from "../../redux/action/actions";
import axios from "axios";

function CompanyComponent(props) {
  const companiesData = useSelector((state) => state.GET_COMPANIES.companies);
  const categoriesData = useSelector((state) => state.CATEGORIES.categories);
  const dispatch = useDispatch();

  const [mode, setMode] = useState("create");
  const [companyValue, setCompanyValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [companyId, setCompanyId] = useState(null);
  const [dataCompanySelected, setDataCompanySelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(get_all_categories());
    dispatch(get_companies());
  }, []);

  useEffect(() => {
    setDataCompanySelected(companiesData);
  }, [companiesData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyValue.trim() || !categoryId) {
      props.toast("error", "Company name cannot be empty");
      return;
    }

    if (mode == "create") {
      let res = await axios.post(
        `${import.meta.env.VITE_API_HOST}/companies/upload_company.php`,
        {
          c_name: companyValue,
          category_id: categoryId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.data.message == "Company uploaded successfully") {
        props.toast("success", "Company Added Successfully");
      }
    } else {
      let res = await axios.patch(
        `${import.meta.env.VITE_API_HOST}/companies/update_company.php`,
        {
          id: companyId,
          c_id: categoryId,
          name: companyValue,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.data.status == 200) {
        props.toast("success", "Company Updated Successfully");
      }
    }
    setMode("create");
    dispatch(get_companies());
    setCompanyValue("");
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
    if (value !== "") {
      let filtered = companiesData.filter((data) =>
        data.category.toLowerCase().includes(value.toLowerCase())
      );
      setDataCompanySelected(filtered);
    } else setDataCompanySelected(companiesData);

    console.log(dataCompanySelected);
  };

  const handleUpdate = (id, c_id, name) => {
    setMode("update");
    setCompanyId(id);
    setCategoryId(c_id);
    setCompanyValue(name);
    scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_API_HOST}/companies/delete_company.php?id=${id}`
    );
    props.toast("success", "Company Deleted Successfully");
    dispatch(get_companies());
  };

  return (
    <div className="category-component">
      <h2>Add New Company</h2>

      <form action="" onSubmit={handleSubmit}>
        <select
          onChange={(e) => setCategoryId(e.target.value)}
          // defaultValue={0}
          required
          value={categoryId}
        >
          <option value={0} disabled>
            Select Category
          </option>

          {categoriesData.length > 0 &&
            categoriesData.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.category}
                </option>
              );
            })}
        </select>

        <div className="input-box">
          <input
            type="text"
            required
            onChange={(e) => setCompanyValue(e.target.value)}
            value={companyValue}
          />
          <span>Enter Company Name</span>
        </div>

        <input
          type="submit"
          value={mode == "create" ? "Add Company" : "Update"}
          style={{ color: "#efef" }}

        />
      </form>

      <h2>show all companies</h2>

      <input
        type="text"
        placeholder="Category Search"
        className="search"
        onChange={(e) => handleSearchValue(e.target.value)}
        value={searchValue}
      />

      <table>
        <thead>
          <tr
            style={{ color: "#efef" }}
          >
            <th>Company Name</th>
            <th>Category</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {dataCompanySelected.length > 0 &&
            dataCompanySelected.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.company}</td>
                  <td className="category">
                    <span>{data.category}</span>
                  </td>
                  <td>
                    <button
                      onClick={(_) =>
                        handleUpdate(data.id, data.c_id, data.company)
                      }
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={(_) => handleDelete(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyComponent;
