import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import { useState } from "react";

const Footer = ({ url }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} 
        onPress={
          () => {
            setIsLiked(!isLiked);
          }
        }
      >
        {
          isLiked ?
            (
              <Image
                source={icons.heart}
                resizeMode='contain'
                style={styles.likeBtnImage}
              />
            ) :
            (
              <Image
              source={icons.heartOutline}
              resizeMode='contain'
              style={styles.likeBtnImage}
            />
          )
        }
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
