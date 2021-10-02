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

let Formations = React.memo(function Formations(props) {
  let [orientation, setOrientation] = useState(null);
  let [load, setLoad] = useState(false);
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
      Titre: 'Titre professionnel de développeur web et mobile',
      Date: '01/01/2020 - 30/08/2021',
      Ecole: 'Epitech',
      Programme:
        'React Native | React.js | Redux | Node.js | MongoDB | Express.js ',
      Obtenu: 'Oui',
      Niveau: 'Bac+2',
      imageone:
        'https://d1fmx1rbmqrxrr.cloudfront.net/zdnet/optim/i/edit/ne/2019/08/epitech-logo-quadri-baseline__w630.png',
    },
    {
      id: 2,
      Titre: 'Formation Infographie / Webdesign',
      Date: '01/03/2016 - 30/06/2016',
      Ecole: 'Greta 5',
      Programme:
        'Photoshop | Illustrator | InDesign WordPress | HTML | CSS | Intégration de maquette',
      Niveau: 'Bac',
      imageone:
        'https://www.pagesjaunes.fr/media/fcp/08513225-a2247cad511c76e3b3cbeb4d405ebe03.gif',
    },
    {
      id: 3,
      Titre: 'BTS Communication',
      Date: '01/09/2012 - 01/09/2014',
      Ecole: 'IFC',
      Programme:
        'Activités de communication | Culture communication | Conseil et relation annonceur | Droit | Management',
      Obtenu: 'Oui',
      Niveau: 'Bac+2',
      imageone:
        'https://lafrenchtech-grandeprovence.fr/wp-content/uploads/2020/07/ifc.jpg',
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
            {item.item.Ecole}
          </Text>
          <Text style={[Style.Text, {fontSize: 17, fontFamily: 'Lato-Light'}]}>
            Du {item.item.Date}
          </Text>
          <Text style={[Style.Text, {fontSize: 17, fontFamily: 'Lato'}]}>
            Programme : {item.item.Programme}
          </Text>

          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Lato',
              fontSize: 17,
              marginTop: '3%',
            }}>
            Obtenu :{' '}
            {item.item.Obtenu
              ? item.item.Obtenu
              : 'Formation qualifiante (Attestation)'}
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

export default Formations;
