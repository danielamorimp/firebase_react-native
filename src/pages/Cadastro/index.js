import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../../firebaseConfig';


export default function Cadastro({navigation}) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [mail, setMail] = useState('');
  const [cidade, setCidade] = useState('');

  function pushFire(){
    try{
      firebase.database().ref('./crud').push({
        nome : nome,
        sobrenome : sobrenome,
        mail : mail,
        cidade : cidade,
      })
      alert('Cadastrado')
    }catch{
      alert('erro')
    }finally{
      setNome('');
      setSobrenome('');
      setMail('');
      setCidade('');
    }
  }



  useEffect(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       console.log("Logado")

      } else {
        console.log('não logado!')
        navigation.navigate('Home')
      }
    });
  },[])

  function logOutFirebase(){
    firebase.auth().signOut().then(function() {
      alert('Deslogado com sucesso')
    }).catch(function(error) {
      alert('Falha')
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastro</Text>

      <TextInput style={styles.input} placeholder='Nome' onChangeText={nome => setNome(nome)} value={nome} />
      
      <TextInput style={styles.input} placeholder='Sobrenome' onChangeText={sobrenome => setSobrenome(sobrenome)} value={sobrenome} />
      
      <TextInput style={styles.input} placeholder='email' onChangeText={mail => setMail(mail)} value={mail} />
      
      <TextInput style={styles.input} placeholder='Cidade' onChangeText={cidade => setCidade(cidade)} value={cidade} />

      <TouchableOpacity style={styles.button} onPress={pushFire}>
        <Text>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>{ logOutFirebase()}}>
        <Text>LogOut</Text>
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
