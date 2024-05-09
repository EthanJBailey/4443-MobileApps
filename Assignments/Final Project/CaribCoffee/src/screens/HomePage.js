import React from 'react';
import { ImageBackground, Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ImageSlider from '../components/ImageSlider';
import Carousel from '../components/Carousel';
import Accordion from '../components/Accordion';
import logo from "../images/genlogo.png"
import headerbg from "../images/testbg2.jpg"

const HomePage = ({ isDarkMode, userEmail }) => {
  const navigation = useNavigation();

  // Mock data for articles, news, recipes, products, and FAQ
  const articlesData = [
    { id: 1, title: "The Art of Espresso", image: require("../images/espresso.jpg") },
    { id: 2, title: "Exploring Coffee Origins", image: require("../images/origins.jpg") },
    { id: 3, title: "10 Delicious Coffee Recipes", image: require("../images/recipes.jpg") },
  ];

  const newsData = [
    { id: 1, title: "New Coffee Shop Opening", description: "A new coffee shop is opening in town. Don't miss the grand opening event!" },
    { id: 2, title: "Coffee Expo 2024", description: "Join us at the Coffee Expo 2024 to discover the latest trends and innovations in the industry." },
    { id: 3, title: "Coffee Price Update", description: "Learn about the latest updates on coffee prices and market trends." },
  ];

  const recipesData = [
    { id: 1, title: "Iced Caramel Macchiato", image: require("../images/iced_caramel_macchiato.jpg") },
    { id: 2, title: "Homemade Pumpkin Spice Latte", image: require("../images/pumpkin_spice_latte.jpg") },
    { id: 3, title: "Vanilla Bean Frappuccino", image: require("../images/vanilla_bean_frappuccino.jpg") },
  ];

  const productsData = [
    { id: 1, title: "Coffee Grinder", image: require("../images/coffee_grinder.jpg") },
    { id: 2, title: "French Press", image: require("../images/french_press.jpg") },
    { id: 3, title: "Coffee Beans Subscription", image: require("../images/coffee_beans_subscription.jpg") },
  ];

  const faqData = [
    { id: 1, question: "How do I brew the perfect cup of coffee?", answer: "To brew the perfect cup of coffee, start with freshly ground beans and adjust the grind size and water temperature according to your brewing method." },
    { id: 2, question: "What's the difference between Arabica and Robusta coffee?", answer: "Arabica coffee beans are known for their smooth flavor and higher acidity, while Robusta beans have a stronger, more bitter taste and higher caffeine content." },
    { id: 3, question: "How should I store coffee beans?", answer: "Store coffee beans in an airtight container in a cool, dark place to preserve their freshness and flavor." },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }]}>
      {/* Header Background Image */}
      <ImageBackground source={headerbg} style={styles.headerBackground}>
        {/* Logo */}
        {/* <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
        </View> */}
       </ImageBackground>
        
        {/* Heading */}
        <View style={styles.notificationContainer}>
          <View style={styles.header}>
            <Image
              source={require('../images/genlogo.png')}
              style={styles.profileImage}
            />
            <View style={styles.headText}>
              <Text style={styles.username}>Hi <Text>{userEmail}</Text></Text>
              <Text style={styles.greeting}>Happy to See You!</Text>
            </View>
          </View>
        </View>
     

      {/* Welcome Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>Welcome back to Carib Coffee!</Text>
        <Text style={[styles.sectionText, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>Discover the world of coffee with our app. Explore brewing methods, learn about different origins, and find delicious recipes to try at home.</Text>
      </View>

      {/* Latest News */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>Latest News</Text>
        {newsData.map(news => (
          <Accordion key={news.id} title={news.title} content={news.description} isDarkMode={isDarkMode} />
        ))}
      </View>

      {/* Recipe of the Week */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>Recipe of the Week</Text>
        <Carousel
          data={recipesData}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} />
              <Text style={[styles.carouselTitle, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>{item.title}</Text>
            </View>
          )}
          sliderWidth={300}
          itemWidth={200}
          loop
        />
      </View>

      {/* Featured Products/Partnerships */}

      {/* <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>Featured Products</Text>
        <ImageSlider images={productsData.map(product => product.image)} />
      </View> */}

      {/* Featured Articles */}

      {/* <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>Featured Articles</Text>
        <ImageSlider images={articlesData.map(article => article.image)} />

        <Button style={[styles.Button, { backgroundColor: isDarkMode ? '#FFFFFF' : '#97694F', color: isDarkMode ? 'black' : '#FFFFFF', marginTop: 20 }]} mode="contained" onPress={() => navigation.navigate('Articles')}>
          Browse More
        </Button>
      </View> */}

      {/* FAQs/Help Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>FAQs</Text>
        {faqData.map(faq => (
          <Accordion key={faq.id} title={faq.question} content={faq.answer} isDarkMode={isDarkMode} />
        ))}
      </View>

      {/* Subscribe/Sign Up */}
      <View style={styles.section}>
        <Button style={[styles.Button, { backgroundColor:'#97694F', color: isDarkMode ? '#97694F' : '#FFFFFF' }]} mode="contained" onPress={() => navigation.navigate('Near Me')}>
          Shops Near You!
        </Button>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: isDarkMode ? '#FFFFFF' : 'black' }]}>© 2024 Carib Coffee. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  Button: {
    color: '#FFFFFF',
  },
  carouselItem: {
    alignItems: 'center',
  },
  carouselImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  notificationContainer: {
    backgroundColor: '#97694F', // light grey background color
    borderRadius: 50, // rounded edges
    padding: 16,
    marginBottom: 16, // add some bottom margin for separation
  },
  greeting: {
    fontSize: 14,
    marginLeft: 12,
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // center alignment
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  headText: {
    marginLeft: 12,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.40, // semi-transparent
  },
});

export default HomePage;
