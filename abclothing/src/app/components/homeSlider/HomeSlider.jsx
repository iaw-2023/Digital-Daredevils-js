"use client";

import { Box, Image } from "@chakra-ui/react";
import React, { Component } from "react";
import Slider from "react-slick";

export default class HomeSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Box
        width={{ base: "90%", sm: "90%", md: "90%", lg: "85%" }}
        margin="auto"
        marginTop={3}
      >
        <Slider {...settings}>
          <Box borderRadius={"8px"}>
              <Image
                borderRadius={"8px"}
                margin={"auto"}
                width={"100%"}
                src="/SliderImage2.gif"
              />
          </Box>
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src="/SliderImage1.jpg"
            />
          </Box>
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src="/SliderImage3.jpg"
            />
          </Box>
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src="/SliderImage4.gif"
            />
          </Box>
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src="/SliderImage5.jpg"
            />
          </Box>
        </Slider>
      </Box>
    );
  }
}