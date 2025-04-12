import React, { useEffect } from 'react';
import './ProductView.css';
import { Container, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { get_moreDetails_pro } from '../../redux/action/actions';
import { useParams } from 'react-router';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import Battery50RoundedIcon from '@mui/icons-material/Battery50Rounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';

function ProductView() {

  const proDetails = useSelector(state => state.GET_MORE_DETAILS_PRO.pro);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(_ => {

    dispatch(get_moreDetails_pro(params.id));

  }, [])

  useEffect(_ => {
    document.title = "MNRW GROUP | " + proDetails.name;
  }, [proDetails])


  return (
    <Container className='product-view-page'>

      <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
        <h3 >
          {proDetails.name}
        </h3>

        <strong >
          ${proDetails.price}
        </strong>
      </Stack>

      <Stack direction={"row"} alignItems={"center"} gap={2} >
        <div className="img-box">
          <img src={`${import.meta.env.VITE_API_HOST}/upload/${proDetails.img}`} alt={proDetails.name} title={proDetails.name} />
        </div>

        <ul className='details-component'>
          <li>
            <div className="icon-box">
              <MemoryRoundedIcon />
              <span >المعالج: </span>
            </div>

            <div className="content">
              {proDetails.procss}
            </div>
          </li>

          <li>
            <div className="icon-box">
              <DonutSmallRoundedIcon />
              <span >الـــــــرام: </span>
            </div>

            <div className="content">
              {proDetails.ram}
            </div>
          </li>

          <li>
            <div className="icon-box">
              <StorageRoundedIcon />
              <span >التخزين: </span>
            </div>

            <div className="content">
              {proDetails.hard}
            </div>
          </li>

          <li>
            <div className="icon-box">
              <CameraAltRoundedIcon />
              <span >الكاميـرا: </span>
            </div>

            <div className="content">
              {proDetails.camireaa}
            </div>
          </li>

          <li>
            <div className="icon-box">
              <TvRoundedIcon />
              <span >الشاشة: </span>
            </div>

            <div className="content">
              {proDetails.display}
            </div>
          </li>

          <li>
            <div className="icon-box">
              <SettingsSuggestRoundedIcon />
              <span >نظام التشغيل: </span>
            </div>

            <div className="content">
              {proDetails.system_info}
            </div>
          </li>

        </ul>
      </Stack>


      <div className="details">
        <div className="good-details">
          <h2 >المميزات</h2>
          <j className="good" />

          <ol >
            {
              proDetails.good_de?.split(".")?.map((part, index) => {
                return (
                  <li key={index}>
                    <p>
                      {part}
                    </p>
                  </li>
                )
              })
            }
          </ol>
        </div>
        <br />
        <div className="bad-details">
          <h2 >العيـــوب</h2>
          <j className="bad" />

          <ol >
            {
              proDetails.bad_de?.split(".")?.map((part, index) => {
                return (
                  <li key={index}>
                    <p>
                      {part}
                    </p>
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
    </Container>
  )
}

export default ProductView