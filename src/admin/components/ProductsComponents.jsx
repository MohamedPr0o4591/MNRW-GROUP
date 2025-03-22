import React, { useState } from "react";
import "./components.css";
import { useDispatch, useSelector } from "react-redux";
import { get_companies, get_pro } from "../../redux/action/actions";
import axios from "axios";

function ProductsComponents(props) {
  let proData = useSelector((state) => state.GET_PRODUCTS.pro);
  let companies = useSelector((state) => state.GET_COMPANIES.companies);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(get_pro());
    dispatch(get_companies());
  }, []);

  const [mode, setMode] = useState("create");

  const [companyId, setCompanyId] = useState(0);
  const [imgReader, setImgReader] = useState();
  const [imgFile, setImgFile] = useState();

  const initialPro = {
    p_name: "",
    p_desc: "",
    p_price: "",
  };
  const [ProductInfo, setProductInfo] = useState(initialPro);

  const uploadImg = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImgReader(reader.result);
    };

    reader.readAsDataURL(file);

    setImgFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    if (mode == "create") {
      formData.append("img", imgFile);
      formData.append("name", ProductInfo.p_name);
      formData.append("desc", ProductInfo.p_desc);
      formData.append("price", ProductInfo.p_price);
      formData.append("company_id", companyId);

      let res = await axios.post(
        `${import.meta.env.VITE_API_HOST}/products/upload_pro.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status == 200) {
        props.toast("success", "Product Added Successfully");
        setProductInfo(initialPro);
        setImgFile(null);
        setImgReader(null);
      }
    }

    dispatch(get_pro());
  };

  return (
    <div className="category-component">
      <form action="" onSubmit={handleSubmit}>
        <h2>add new product</h2>

        <div className="input-container">
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          >
            <option value={0} disabled>
              Select Company
            </option>
            {companies.length > 0 &&
              companies.map((data, index) => {
                return (
                  <option value={data.id} key={index}>
                    {data.company}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="input-container">
          <div className="input-box">
            <input
              type="text"
              required
              value={ProductInfo.p_name}
              onChange={(e) =>
                setProductInfo({ ...ProductInfo, p_name: e.target.value })
              }
            />
            <span>Product Name</span>
          </div>
          <div className="input-box">
            <input
              type="text"
              required
              value={ProductInfo.p_desc}
              onChange={(e) =>
                setProductInfo({ ...ProductInfo, p_desc: e.target.value })
              }
            />
            <span>Description</span>
          </div>
          <div className="input-box">
            <input
              type="number"
              required
              value={ProductInfo.p_price}
              onChange={(e) =>
                setProductInfo({ ...ProductInfo, p_price: e.target.value })
              }
            />
            <span>Price</span>
          </div>
        </div>

        <div className="upload-box">
          <label htmlFor="upload">
            {imgReader ? (
              <img src={imgReader} alt="" />
            ) : (
              <span>Upload Product Image</span>
            )}
          </label>
          <input
            type="file"
            name="img"
            id="upload"
            required
            onChange={uploadImg}
          />
        </div>

        <input type="submit" value="Add Product" />
      </form>

      <br />
      <br />
      {/* Show */}
      <div className="show-products">
        <h2>show products</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Img</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proData.length > 0 &&
              proData.map((data, index) => {
                return (
                  <tr key={data.id}>
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
                    <td>{data.desc}</td>
                    <td>{(+data.price)?.toLocaleString("en-US")}</td>
                    <td>{data.category}</td>
                    <td>{data.company}</td>
                    <td>action</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsComponents;
