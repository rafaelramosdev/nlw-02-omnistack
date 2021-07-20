import { useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { View, Text, TextInput, ScrollView } from "react-native";

import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import { Feather } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

import { Header } from "../../components/Header";
import { TeacherItem, Teacher } from "../../components/TeacherItem";

import styles from './styles';

export function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  };

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });
        
        setFavorites(favoritedTeachersIds);
      }
    })
  };

  async function handleFiltersSubmit() {
    if(!subject || !week_day || !time)
      return;

    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setIsFiltersVisible(false);
    
    setTeachers(response.data);
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#ffffff" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput style={styles.input} 
              placeholder="Qual a matéria?" 
              placeholderTextColor="#c1bccc" 
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput style={styles.input} 
                  placeholder="Qual o dia?" 
                  placeholderTextColor="#c1bccc" 
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput style={styles.input} 
                  placeholder="Qual horário?" 
                  placeholderTextColor="#c1bccc" 
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton style={styles.searchButton} onPress={handleFiltersSubmit}>
              <Text style={styles.searchButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}
      </Header>
        
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}