import { View, Text } from 'react-native'
import React from 'react';
import { images } from "../../images";

import { SliderBox } from "react-native-image-slider-box";


const imagesArr =[
  images.single_room ,  images.double_room ,  images.suites_room
  ]
  
  export default function CarouselImages() {

  return (
    <View>
      <SliderBox images={imagesArr} />
   
    </View>
  )
}