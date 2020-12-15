import React, {Component} from 'react'
import Slider from 'react-slick'
import './style/hero-carousel.css'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img
              src="https://whitneymedia.org/assets/artwork/16291/193376.jpeg"
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
              src="https://www.glenstone.org/wp-content/uploads/prod/2018/08/SERRr_GF_ToLift-731x548.jpg"
              className="carousel-slide"
            />
            <h3 />
          </div>
          <div>
            <img
              src="https://miro.medium.com/max/6636/1*cr0GmNSI1pZQ1XYdu_OE4A.jpeg"
              className="carousel-slide"
            />
            <h3 />
          </div>
        </Slider>
      </div>
    )
  }
}
