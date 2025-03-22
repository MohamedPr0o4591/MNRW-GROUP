import React, { useEffect, useState } from "react";
import "./ComparePage.css";
import { Button, Container, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_categories,
  get_companies,
  get_pro,
} from "../../redux/action/actions";
import { DeleteRounded } from "@mui/icons-material";

function ComparePage() {
  const categoriesData = useSelector((state) => state.CATEGORIES.categories);
  const companiesData = useSelector((state) => state.GET_COMPANIES.companies);
  const productsData = useSelector((state) => state.GET_PRODUCTS.pro);
  const dispatch = useDispatch();

  const initialSelectedData = {
    companies: [],
    products: [],
  };
  const [selectedData, setSelectedData] = useState(initialSelectedData);

  const initialSelectedValue = {
    categoryValue: 0,
    companyValue: 0,
    phoneValue: 0,
  };
  const [SelectedValues, setSelectedValues] = useState(initialSelectedValue);

  const [dataPreview, setDataPreview] = useState([]);

  useEffect(() => {
    dispatch(get_all_categories());
    dispatch(get_companies());
    dispatch(get_pro());
  }, []);

  useEffect(() => {
    if (categoriesData.length > 0) {
      let filter = companiesData.filter(
        (data) => data.c_id == SelectedValues.categoryValue
      );
      setSelectedData((prev) => ({ ...prev, companies: filter }));
    }

    if (productsData.length > 0) {
      let filter = productsData.filter(
        (data) =>
          data.company_id == SelectedValues.companyValue &&
          data.category_id == SelectedValues.categoryValue
      );
      setSelectedData((prev) => ({
        ...prev,
        products: filter,
      }));
    }
  }, [SelectedValues.categoryValue, SelectedValues.companyValue]);

  useEffect(() => {
    setDataPreview(JSON.parse(sessionStorage.getItem("compares")) || []);
  }, [sessionStorage.compares]);

  const handleAddCompare = (e) => {
    e.preventDefault();
    let compares = JSON.parse(sessionStorage.getItem("compares")) || [];
    let selectedPro = productsData.find(
      (data) => data.id == SelectedValues.phoneValue
    );

    compares.push(selectedPro);

    sessionStorage.setItem("compares", JSON.stringify(compares));

    setSelectedValues(initialSelectedValue);
  };

  const handleDeleteItem = (id) => {
    let compares = JSON.parse(sessionStorage.getItem("compares")) || [];
    compares.splice(id, 1);
    sessionStorage.setItem("compares", JSON.stringify(compares));

    setDataPreview(compares);
  };

  return (
    <section className="compare">
      <Container>
        <form action="" onSubmit={handleAddCompare}>
          <h2>Compare Phone</h2>

          <div className="flex-box">
            <div className="categories">
              <h3>Choose</h3>
              <select
                onChange={(e) =>
                  setSelectedValues({
                    ...SelectedValues,
                    categoryValue: e.target.value,
                  })
                }
                value={SelectedValues.categoryValue}
              >
                <option value={0}> Select Category</option>
                {categoriesData.length > 0 &&
                  categoriesData.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.category}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="categories">
              <h3>Choose</h3>
              <select
                disabled={SelectedValues.categoryValue > 0 ? false : true}
                value={SelectedValues.companyValue}
                onChange={(e) =>
                  setSelectedValues({
                    ...SelectedValues,
                    companyValue: e.target.value,
                  })
                }
              >
                <option value={0}>Select Company</option>
                {selectedData.companies?.map((data) => {
                  return (
                    <option value={data.id} key={data.id}>
                      {data.company}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="categories">
              <h3>Choose</h3>
              <select
                disabled={SelectedValues.companyValue > 0 ? false : true}
                value={SelectedValues.phoneValue}
                onChange={(e) =>
                  setSelectedValues({
                    ...SelectedValues,
                    phoneValue: e.target.value,
                  })
                }
              >
                <option value={0}>Select Phone</option>
                {selectedData.products.map((data) => {
                  return (
                    <option value={data.id} key={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <Button
            disabled={
              SelectedValues.companyValue > 0 && SelectedValues.phoneValue > 0
                ? false
                : true
            }
            type="submit"
            variant="contained"
          >
            Add Compare
          </Button>
        </form>

        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>img</th>
              <th>name</th>
              <th>price</th>
              <th>description</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {dataPreview?.length > 0 ? (
              dataPreview.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`${import.meta.env.VITE_API_HOST}/upload/${
                          data.img
                        }`}
                        alt={data.name}
                      />
                    </td>
                    <td>{data.name}</td>

                    <td>{(+data.price).toLocaleString("en-us")}</td>
                    <td>{data.desc}</td>
                    <td>
                      <IconButton
                        color="error"
                        onClick={(_) => handleDeleteItem(index)}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} align="center">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
    </section>
  );
}

export default ComparePage;
