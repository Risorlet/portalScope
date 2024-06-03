import { useState } from "react";
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../../constants";

import { Ionicons } from "@expo/vector-icons";

import {
  Nearbyjobs,
  Popularjobs,
  Welcome,
} from "../../components";

const Home = () => {
  const {name} = useGlobalSearchParams();
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
     <Stack.Screen options=
        {{
          headerShadowVisible: false,
          headerTitle: "portalScope",
          headerTitleStyle: {
            color: COLORS.tertiary,
            fontWeight: 'bold'
          },
          headerLeft: ()=>(<></>),
          headerTitleAlign: 'center',
          statusBarColor: COLORS.lightWhite,
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          }
        }}
     />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            userName = {name == undefined ? 'User' : name}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
          
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
      <Pressable style={styles.floatingButton} onPress={() => {router.push('/bot/bot')}}>
          <Ionicons name='chatbox-ellipses' size={30} color={COLORS.primary}/>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 50,
    backgroundColor: COLORS.tertiary,
    borderRadius: 50
  }
});

export default Home;
