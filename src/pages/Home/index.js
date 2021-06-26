import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../../firebaseConfig';


export default function Home ({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function loginFirebase(){
    firebase.auth().signInWithEmailAndPassword(email, senha).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);

    });
  }

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       console.log("Logado")
       navigation.navigate('Cadastro')

      } else {
        console.log('não logado!')
      }
    });
  },[])

  function logOutFirebase(){
    firebase.auth().signOut().then(function() {
      alert('Deslogado com sucesso"')
    }).catch(function(error) {
      alert('Falha"')
    });
  }

  function createUserFirebase(){
    firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function(error) {
      alert(errorCode, errorMessage);
    });
  }



  return (
    <View style={styles.container}>
      <Text style={styles.text}>LOGIN</Text>

      <TextInput style={styles.input} placeholder='digite seu e-mail' onChangeText={email => setEmail(email)} value={email} />

      <TextInput secureTextEntry style={styles.input} placeholder='digite sua senha' onChangeText={senha => setSenha(senha)} value={senha} />
  
      <TouchableOpacity style={styles.button} onPress={()=>{loginFirebase()}}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>{ logOutFirebase()}}>
        <Text>LogOut</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>{ createUserFirebase()}}>
        <Text>Criar Usuario</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 15
  },
  input: {
    width: 250,
    height: 60,
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 10,
    textAlign: 'center'
  },
  button: {
    marginTop: 15,
    width: 250,
    height: 60,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
