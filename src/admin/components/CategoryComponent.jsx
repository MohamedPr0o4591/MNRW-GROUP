import React, { useState } from "react";
import "./components.css";
import { useDispatch, useSelector } from "react-redux";
import { get_all_categories } from "../../redux/action/actions";
import axios from "axios";

function CategoryComponent(props) {
  const [mode, setMode] = useState("create");
  const categoriesData = useSelector((state) => state.CATEGORIES.categories);
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [idSelected, setIdSelected] = useState(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    document.title = "Admin | Add New Category";

    dispatch(get_all_categories());
  }, []);

  let handleUpdate = (id, name) => {
    setMode("update");
    scrollTo(0, 0);
    inputRef.current.focus();
    setCategoryName(name);
    setIdSelected(id);
  };

  var handleDelete = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_API_HOST}/categories/delete_category.php?id=${id}`
    );
    props.toast("success", "Category Deleted Successfully");
    dispatch(get_all_categories());
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      props.toast("error", "Category name cannot be empty");
      return;
    }

    if (mode == "create") {
      await axios.post(
        `${import.meta.env.VITE_API_HOST}/categories/upload_category.php`,
        {
          c_name: categoryName,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      props.toast("success", "Category Added Successfully");
    } else {
      await axios.patch(
        `${import.meta.env.VITE_API_HOST}/categories/update_category.php`,
        {
          id: idSelected,
          c_name: categoryName,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      props.toast("success", "Category Updated Successfully");
    }

    setCategoryName("");
    setMode("create");
    dispatch(get_all_categories());
  };

  return (
    <div className="category-component" >
      <h2>Add New Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            ref={inputRef}
            required
          />
          <span>Category Name</span>
        </div>

        <input
          type="submit"
          value={mode == "create" ? "Add Category" : "Update"}
          style={{ color: "#efef" }}
        />
      </form>

      {/* show all categories */}

      <h2>Show All Categories</h2>

      <table>
        <thead>
          <tr
            style={{ color: "#efef" }}
          >
            <th>Category Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categoriesData.length > 0 &&
            categoriesData.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.category}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(data.id, data.category)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(data.id)}>
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

export default CategoryComponent;
