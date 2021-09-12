import React, {useState, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { AuthContext } from '../context/authContext';
import Auth from './auth/auth';
import Role from "./auth/role";
import OwnerHome from './ownerHome';
import AdminHome from './adminHome';


function Home() {
    const context = useContext(AuthContext);
    const image1 =
  "img1.jfif";
const image2 =
  "img2.jfif";
const image3 =
  "img3.jfif";
    return(
        <>
        <Role condition={!context.loggedIn}>

        <Carousel fade >
        <Carousel.Item interval={2000}>
          <img src={image1} alt="First slide" className="d-block w-100 fix-hight" />
          <div class="carousel-caption d-none d-md-block">
            <h2 className="h2forslider">House Bounce</h2>
            <h5>Masters of houses buying</h5>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
          className="d-block w-100 fix-hight"
            src={image2}
            alt="Second slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h2 className="h2forslider">A great place to sell,</h2>
            <h5>Become a Rich! </h5>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
          className="d-block w-100 fix-hight"
            src={image3}
            alt="Third slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h2 className="h2forslider"> Get Profits Without Limits</h2>
            <h5>
              You will be free to go wherever you want!
            </h5>
          </div>
        </Carousel.Item>
      </Carousel>
        </Role>
        <Auth cond={context.user.role == 'houseOwner'}>
        <OwnerHome/>
        </Auth>
        <Auth cond={context.user.role == 'admin'}>
        <AdminHome/>
        </Auth>
      </>
    )
    
}

export default Home;