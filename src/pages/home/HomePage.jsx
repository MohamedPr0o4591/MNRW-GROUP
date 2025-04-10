import React, { useState } from "react";
import "./HomePage.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { get_all_categories, get_pro } from "../../redux/action/actions";
import { Stack } from "@mui/material";

export default function HomePage(props) {
  const categoriesData = useSelector((state) => state.CATEGORIES.categories);
  const proData = useSelector((state) => state.GET_PRODUCTS.pro);
  const dispatch = useDispatch();
  const [categorySelected, setCategorySelected] = useState();
  const [proSelected, setProSelected] = useState([]);

  React.useEffect(() => {
    dispatch(get_all_categories());
    dispatch(get_pro());
  }, []);

  React.useEffect(() => {
    setCategorySelected(categoriesData[0]?.id);
  }, [categoriesData]);

  React.useEffect(() => {
    let filterData = proData.filter(
      (data) => data.category_id == categorySelected
    );

    setProSelected(filterData);
  }, [categorySelected, proData]);

  const handleAddPro = (id) => {
    let selectedPro = proData.find((data) => data.id == id);

    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length > 0) {
      let check = products.find((data) => data.id == id);
      if (check) {
        check.quantity += 1;
      } else {
        products.push({ ...selectedPro, quantity: 1 });
      }
    } else {
      products.push({ ...selectedPro, quantity: 1 });
    }

    localStorage.setItem("products", JSON.stringify(products));

    props.toast("success", "Product Added Successfully");
  };

  return (
    <div className="home-page">
      <div className="categories-box">
        <ul>
          {categoriesData.length > 0 &&
            categoriesData.map((data, index) => {
              return (
                <li key={index}>
                  <button
                    className={data.id == categorySelected ? "active" : ""}
                    onClick={(_) => setCategorySelected(data.id)}
                  >
                    {data.category}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="products-component">
        {proSelected.length > 0
          ? proSelected.map((data, index) => {
              if (data.company !== proSelected[index - 1]?.company) {
                return (
                  <div key={index}>
                    <h2>{data.company}</h2>
                    <Swiper
                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={true}
                      slidesPerView={"auto"}
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      pagination={false}
                      modules={[EffectCoverflow, Pagination]}
                      className="mySwiper"
                    >
                      {proSelected
                        .filter((d) => d.company === data.company)
                        .map((newData) => {
                          return (
                            <SwiperSlide key={newData.id}>
                              <div className="card">
                                <img
                                  src={`${
                                    import.meta.env.VITE_API_HOST
                                  }/upload/${newData.img}`}
                                />

                                <div className="content">
                                  <h4>{newData.name}</h4>
                                  <span>{newData.desc}</span>
                                  <Stack direction={'row'} alignItems={'center'} justifyContent={"space-between"} >
                                  <p>
                                    ${(+newData.price).toLocaleString("en")}
                                  </p>

                                  <a href="" target="_blank" className="more-details">
                                    عرض التفاصيل
                                  </a>
                                  </Stack>

                                  <button
                                    onClick={(_) => handleAddPro(newData.id)}
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
}
