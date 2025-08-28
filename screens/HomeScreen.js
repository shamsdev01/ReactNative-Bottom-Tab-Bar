import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import Card from '../components/Card';

const DATA = Array.from({ length: 25 }, (_, i) => ({ id: i.toString(), title: `Card ${i + 1}` }));

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  const handleSearch = () => {
    if (search.trim() === '') {
      setFilteredData(DATA);
    } else {
      setFilteredData(
        DATA.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
      );
    }
  };

  const renderItem = ({ item }) => <Card title={item.title} />;

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cards..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 32,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#222',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  list: {
    paddingVertical: 16,
  },
});
