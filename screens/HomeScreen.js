import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';

const DATA = Array.from({ length: 25 }, (_, i) => ({ id: i.toString(), title: ` ${i + 1}` }));

export default function HomeScreen() {
  const renderItem = ({ item }) => <Card title={item.title} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
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
  list: {
    paddingVertical: 16,
  },
});
