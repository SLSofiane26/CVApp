import {DrawerActions} from '@react-navigation/routers';
import qs from 'qs';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Linking,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export async function sendEmail(to, subject, body, options = {}) {
  const {cc, bcc} = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc,
  });

  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}

let Contact = React.memo(function Contact(props) {
  let [orientation, setOrientation] = useState(null);

  let [succes, setSucces] = useState(false);

  let [form, setform] = useState({
    name: null,
    prenom: null,
    email: null,
    sujet: null,
    commentaire: null,
  });

  let [error, setError] = useState(false);

  let width = Dimensions.get('window').width;

  let height = Dimensions.get('window').height;

  let isValid = obj => {
    let valid = false;

    Object.values(obj).forEach(val => {
      !val ? (valid = false) : (valid = true);
    });

    return valid;
  };

  useEffect(() => {
    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPe');
    }
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPe');
      }
    });
  }, []);

  let handleSubmit = () => {
    if (
      isValid(form) &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
    ) {
      setSucces(true);
      setform({
        ...form,
        commentaire: null,
        sujet: null,
        name: null,
        email: null,
        prenom: null,
      });
      setTimeout(() => {
        setSucces(false);
      }, 4000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 7000);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#394648'}}>
      <View
        style={{
          alignSelf: 'flex-start',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
          marginTop: orientation === 'PORTRAIT' ? '15%' : '3%',
          zIndex: 10000,
        }}>
        <TouchableOpacity
          style={{marginRight: '5%'}}
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }>
          <Icon name="bars" color="#28AFB0" size={50} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{marginTop: orientation === 'PORTRAIT' ? '25%' : '10%'}}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {succes && (
            <Text
              style={{
                color: 'rgb(23,234,234)',
                fontFamily: 'Lato',
                fontSize: 18,
                top: '2%',
              }}>
              Merci pour votre message !
            </Text>
          )}
          <TextInput
            defaultValue={form.name}
            placeholder={error && !form.name ? '*Nom obligatoire' : 'Nom'}
            textContentType="familyName"
            placeholderTextColor={error && !form.name ? 'white' : 'grey'}
            dataDetectorTypes="all"
            keyboardType="default"
            textBreakStrategy="highQuality"
            keyboardAppearance="light"
            onChangeText={val => setform({...form, name: val})}
            style={[
              Style.input,
              {backgroundColor: error && !form.name ? 'red' : 'transparent'},
            ]}
          />
          <TextInput
            defaultValue={form.prenom}
            onChangeText={val => setform({...form, prenom: val})}
            placeholder={
              error && !form.prenom ? '*Prénom obligatoire' : 'Prénom'
            }
            textContentType="name"
            placeholderTextColor={error && !form.prenom ? 'white' : 'grey'}
            dataDetectorTypes="all"
            keyboardType="default"
            textBreakStrategy="highQuality"
            keyboardAppearance="light"
            style={[
              Style.input,
              {backgroundColor: error && !form.prenom ? 'red' : 'transparent'},
            ]}
          />
          <TextInput
            defaultValue={form.email}
            onChangeText={val => setform({...form, email: val})}
            placeholder={
              (error && !form.email) ||
              (error &&
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  form.email,
                ))
                ? '*Adresse email invalide'
                : 'Email'
            }
            textContentType="emailAddress"
            placeholderTextColor={
              (error && !form.email) ||
              (error &&
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  form.email,
                ))
                ? 'white'
                : 'grey'
            }
            textBreakStrategy="highQuality"
            keyboardAppearance="light"
            style={[
              Style.input,
              {
                backgroundColor:
                  (error && !form.email) ||
                  (error &&
                    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      form.email,
                    ))
                    ? 'red'
                    : 'transparent',
              },
            ]}
          />
          {error &&
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{(2, 3)})+$/.test(
              form.email,
            ) && (
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Lato',
                  fontSize: 18,
                  top: '2%',
                }}>
                Adresse email invalide
              </Text>
            )}
          <TextInput
            defaultValue={form.sujet}
            placeholder={
              error && !form.sujet ? '*Veuillez renseigner un sujet' : 'Sujet'
            }
            placeholderTextColor={error && !form.sujet ? 'white' : 'grey'}
            dataDetectorTypes="all"
            keyboardType="default"
            textBreakStrategy="highQuality"
            keyboardAppearance="light"
            style={[
              Style.input,
              {backgroundColor: error && !form.sujet ? 'red' : 'transparent'},
            ]}
            onChangeText={val => setform({...form, sujet: val})}
          />
          <TextInput
            defaultValue={form.commentaire}
            onChangeText={val => setform({...form, commentaire: val})}
            multiline
            numberOfLines={5}
            style={{
              width: '80%',
              height: 200,
              marginTop: '10%',
              paddingLeft: '10%',
              borderColor: 'white',
              borderWidth: 1,
              fontFamily: 'Lato',
              color: 'white',
              backgroundColor:
                error && !form.commentaire ? 'red' : 'transparent',
            }}
            placeholderTextColor={error && !form.commentaire ? 'white' : 'grey'}
            placeholder={
              error && !form.commentaire
                ? '*Champ obligatoire'
                : 'Votre demande...'
            }
          />

          {error && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Lato',
                fontSize: 18,
                top: '2%',
              }}>
              Tout les champs sont obligatoires*
            </Text>
          )}
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              width: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 10,
              marginTop: '10%',
              marginBottom: '10%',
            }}>
            <Text style={{fontFamily: 'Lato', color: 'black'}}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});

let Style = StyleSheet.create({
  input: {
    width: '80%',
    height: 60,
    marginTop: '10%',
    paddingLeft: '10%',
    borderColor: 'white',
    borderWidth: 1,
    fontFamily: 'Lato',
    color: 'white',
  },
  error: {
    fontFamily: 'Lato',
    color: 'red',
    marginTop: '1%',
    fontSize: 20,
  },
});

export default Contact;
