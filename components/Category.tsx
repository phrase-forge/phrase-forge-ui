import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = [
  { name: 'Health', icon: 'medkit-outline', color: '#68AFBF' },
  { name: 'Art', icon: 'color-palette-outline', color: '#C6A8A8' },
  { name: 'Mythology', icon: 'book-outline', color: '#C6A8A8' },
  { name: 'Biology', icon: 'leaf-outline', color: '#68AFBF' },
  { name: 'Category 5', icon: 'document-outline', color: '#68AFBF' },
  { name: 'Category 6', icon: 'clipboard-outline', color: '#C6A8A8' },
];

const Category = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    if (searchText === '') {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter(category => 
          category.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Category</Text>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../assets/avatar.png')} 
            style={styles.profileImage} 
          />
        </View>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#666" />
          <TextInput 
            placeholder="Find category" 
            style={styles.searchInput} 
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <ScrollView contentContainerStyle={styles.categoryContainer}>
          {filteredCategories.map((category, index) => (
            <TouchableOpacity key={index} style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <Icon name={category.icon} size={30} color="#fff" />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  profileImage: {
    width: 70,
    height: 60,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  categoryText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default Category;
