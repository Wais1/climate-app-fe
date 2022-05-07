import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as theme from "../theme";

const Article = ({route}) => {
  const { width, height } = Dimensions.get("window");
  const scrollX = new Animated.Value(0);
  const navigate = useNavigation();

//   Default article data
  const [article, setArticle] = useState({id: "1",
  image: require("../images/article/articleSustainability.jpg"),
  title: "Example Title",
  description: "Example description",
  content: "Example Content"})

//   Articles data
  const articles = [
      {
        id: "123",
        image: require("../images/article/veganDiet.jpg"),
        title: "How to be Vegan",
        description: "Learn easy strategies to integrate a vegan diet into your life",
        content: "Text"
    },
    {
        id: "456",
        image: require("../images/article/articleSustainability.jpg"),
        title: "How to Reuse fruit!",
        description: "Test description",
        content: "Content Text"
    },
];

//   RENDER article according to the ID passed through learn screen
// perhaps move id and route params out of use efect
useEffect(() => {
    const {id} = route.params;
        setArticle(articles.find(x => x.id === id))
    },[route.params])

  return (
    <View>
        {/* Nav BACK button. can separate into a different component*/}
        <View style={[styles.flex, styles.row, styles.header]}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigate.goBack()}
          >
            <FontAwesome
              name="chevron-left"
              color={theme.colors.white}
              size={theme.sizes.font * 1}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              name="more-horiz"
              color={theme.colors.white}
              size={theme.sizes.font * 1.5}
            />
          </TouchableOpacity>
        </View>
      <ScrollView>

        {/* Article */}
         <View style={styles.flex}>
          <View style={[styles.flex]}>
            <ScrollView
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: scrollX } } },
              ])}
            >
              {/* Image */}
              <Image
                // Possibly remove key
                source={article.image}
                resizeMode="cover"
                style={{ width, height: width }}
              />
            </ScrollView>
          </View>
          <View style={[styles.flex, styles.content]}>
            <View style={[styles.flex, styles.contentHeader]}>
                {/* Title */}
              <Text style={styles.title}>{article.title}</Text>

              <TouchableOpacity>
                <Text style={styles.description}>
                    {/* Description */}
                  {article.description.split("").slice(0, 180)}...
                  <Text style={{ color: theme.colors.active }}> Read more</Text>
                </Text>
              </TouchableOpacity>
            
            {/* Main Article Content */}
            <View style={tw`mt-8`}> 
                <Text style={tw`text-base `}> {article.content}
                </Text>
            </View> 
            
            </View>
            
          </View>
        </View>
        
 
      </ScrollView>
    </View>
  );
};

export default Article;

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
    top: 10,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: "bold",
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption,
  },
});
