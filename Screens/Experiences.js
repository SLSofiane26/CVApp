import {DrawerActions} from '@react-navigation/routers';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

let Experiences = React.memo(function Experiences(props) {
  let [orientation, setOrientation] = useState(null);

  let cc = false;

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  useEffect(() => {
    if (!cc) {
      if (w < h) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    }
    return () => {
      cc = true;
    };
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    }),
      [];
  });

  let d = [
    {
      id: 1,
      Titre: 'Développeur mobile',
      Date: '01/08/2021 - 30/08/2021',
      Company: 'Agence Janvier',
      body: "Création d'une application pour l'hôtel Mas de la Fouque",
      technos: 'React Native | Redux',
      desc: "Création de l'application tablette Android et iOS",
      imageone:
        'data:image/jpeg;base64,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',
      image:
        'https://www.masdelafouque.com/wp-content/uploads/2019/12/Rectangle-160.jpg',
      imagebis: 'https://zupimages.net/up/21/39/2a5n.png',
    },
    {
      id: 2,
      Titre: 'Développeur mobile',
      Company: 'Agence Suncha',
      Date: '01/01/2021 - 01/07/2021',
      body: "Création de l'application SIDAM",
      desc: "Création de l'application mobile iOS et Android, création de l'API et du Back-Office",
      technos: 'React Native | React.js | Redux | Node.js',
      imageone:
        'https://suncha.fr/wp-content/uploads/2020/09/logo-suncha-yoast.jpg',
      image:
        'https://media-exp1.licdn.com/dms/image/C4D0BAQG9hqzvToL9qA/company-logo_200_200/0/1519922052106?e=2159024400&v=beta&t=6KJjw0fG9SmiuhC5oXBycFVw-GlaafmNp-r7HKyjtj8',
      imagebis: 'https://zupimages.net/up/21/39/02m1.jpg',
    },
  ];

  let renderItem = item => {
    return (
      <View
        style={{
          width: '100%',
          marginTop: '10%',
          paddingBottom: '10%',
          borderBottomWidth: 1,
          borderBottomColor: 'white',
        }}>
        <View>
          <Text style={[Style.Text, {fontSize: 23, fontFamily: 'Lato-Bold'}]}>
            {item.item.Titre}
          </Text>
          <Text style={[Style.Text, {fontSize: 20, fontFamily: 'Lato-Light'}]}>
            {item.item.Company}
          </Text>
          <Text style={[Style.Text, {fontSize: 17, fontFamily: 'Lato-Light'}]}>
            Du {item.item.Date}
          </Text>
          <Text style={[Style.Text, {fontSize: 17, fontFamily: 'Lato'}]}>
            {item.item.body}
          </Text>
          <Text style={[Style.Text, {fontSize: 17, fontFamily: 'Lato'}]}>
            {item.item.desc}
          </Text>
          <Text style={[Style.Text, {fontSize: 17, fontFamily: 'Lato'}]}>
            Technos : {item.item.technos}
          </Text>

          <Image
            source={{uri: item.item.imageone}}
            resizeMode="stretch"
            style={{
              width: '100%',
              height: 200,
              marginTop: '3%',
            }}
          />

          <Image
            source={{
              uri: item.item.imagebis,
            }}
            style={{
              width: '100%',
              height: 250,
              marginTop: '3%',
              marginBottom: '5%',
            }}
            resizeMode="stretch"
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#394648',
      }}>
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
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={d}
        keyExtractor={(items, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{}}
        style={{
          marginTop: orientation === 'PORTRAIT' ? '25%' : '4%',
        }}
        scrollEnabled
      />
    </View>
  );
});

let Style = StyleSheet.create({
  Text: {
    color: 'white',
    textAlign: 'center',
    marginTop: '3%',
  },
});

export default Experiences;
