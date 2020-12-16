import React, {Component} from 'react'
import Slider from 'react-slick'
import './style/hero-carousel.css'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      cssEase: 'linear'
    }
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img
              src="https://wp-cpr.s3.amazonaws.com/uploads/2019/06/clyfford_orange-2.jpg"
              className="carousel-slide"
            />
            <h3 />
          </div>
          <div>
            <img
              src="https://www.theparisreview.org/blog/wp-content/uploads/2016/05/pl001.png"
              className="carousel-slide"
            />
            <h3 />
          </div>
          <div>
            <img
              src="https://www.nationalgalleries.org/sites/default/files/LeWitt-desktopLarge.jpg"
              className="carousel-slide"
            />
            <h3 />
          </div>
          <div>
            <img
              src="https://farticulate.files.wordpress.com/2010/12/15269aa4.jpg"
              className="carousel-slide"
            />
            <h3 />
          </div>
          <div>
            <img
              src="https://www.glenstone.org/wp-content/uploads/prod/2018/08/SERRr_GF_ToLift-731x548.jpg"
              className="carousel-slide"
            />
            <h3 />
          </div>
          <div>
            <img
              src="https://medias.slash-paris.com/main_images/images/000/010/636/richard_serra_galerie_lelong_paris_exposition-1_large.jpg?1519062386"
              className="carousel-slide"
            />
            <h3 />
          </div>
        </Slider>
      </div>
    )
  }
}
