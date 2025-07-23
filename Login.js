import React,{useState} from "react";
import {View,Text,TextInput,Button,StyleSheet,Alert, Touchable, TouchableOpacity,Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Login(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigation=useNavigation();
    const handleLogin=()=>{
      if(email=="solairaja015@gmail.com" && password=="admin123")
      {
          Alert.alert("Login Successfully");
          navigation.navigate("Geopage");
      }
      else
      {
        Alert.alert("Login Failed");
      }
    }

    return(
      <View style={styles.container}>
        
        <Text style={styles.title}>Login Page</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"      
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signup}>
            <Text style={styles.signupText}>Don't have an account? <Text style={styles.register}>Register</Text></Text>
          </View>
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',   // Modern blue background
    justifyContent: 'center',
    padding: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2c3e50',
  },
  inputBox: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    marginTop: 12,
    paddingHorizontal: 15,
  },
  input: {
    color: '#2c3e50',
    fontSize: 16,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#2980b9',  // Deep blue button
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signup: {
    padding: 15,
    marginTop: 15,
  },
  signupText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  register: {
    color: '#f1c40f', // Yellow highlight
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 25,
  },
});
