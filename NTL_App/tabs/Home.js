import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const projects = [
    { name: "MetaBot", owner: "Aditya Gurram", description: "This project creates custom chat bots using prompts for SMPs, using React, Django, FAST API, and Gemini API." },
    { name: "Project X", owner: "Jane Doe", description: "An innovative project using AI to analyze market trends." },
    { name: "NextGen App", owner: "John Smith", description: "An app built with Flutter to provide health monitoring solutions." },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.recent}>Recent Project Approvals</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {projects.map((project, index) => (
          <View key={index} style={[styles.card, styles.shadow]}>
            <Text style={styles.name}>{project.name}</Text>
            <Text style={styles.role}>{project.owner}</Text>
            <Text style={styles.btext}>{project.description}</Text>

            <TouchableOpacity style={styles.more}>
              <Icon name="link" style={styles.icon} size={19} color="#ffffff" />
              <Text style={styles.moretext}>Read More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  recent: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    marginTop: 26,
    marginLeft: -40,
    alignSelf: 'flex-start',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#000', 
    borderColor: '#FFFFFF',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 30,
    paddingTop: 30,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 15, 
    width: Dimensions.get('window').width * 0.89,
    alignContent: 'center',
    paddingBottom: 20,
    height:'49%'
  },
  name: {
    color: "#FFFFFF",
    fontSize: 23,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
  },
  role: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins_500Medium',
  },
  btext: {
    color: '#ffffff',
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginBottom: 20,
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moretext: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    alignItems: 'center',
    marginBottom: 5,
  },
});
