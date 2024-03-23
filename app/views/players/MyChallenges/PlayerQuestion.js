import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PlayerQuestions = ({ navigation, route }) => {
  const data = route?.params?.data;
  const [Data, setData] = useState([]);
  const [getcurrentindex, setcurrentindex] = useState('');
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  useEffect(() => {
    if (data?.questionnaireChallenge?.options.length > 0) {
      const arr = data?.questionnaireChallenge?.options?.map(item => ({
        text: item,
        select: false,
      }));
      setData(arr);
    }
  }, [data?.questionnaireChallenge?.options.length]);
  const handleOptions = (val, index) => {
    setcurrentindex(index);
    let temp = Data.map((item, i) => ({
      ...item,
      select: i === index ? val : false, // Set the current index to val, others to false
    }));
    setData(temp);
  };

  const checkAnswer = () => {
    if (
      Number(getcurrentindex) ===
        Number(data?.questionnaireChallenge?.correctAnswer[0]) &&
      typeof getcurrentindex === 'number'
    ) {
      setModalVisible(true);
      setProgress(100);
    } else {
      setModalVisible1(true);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Image
        source={require('../../../assets/new/backimg.png')}
        style={{ height: 300, width: '105%', position: 'absolute' }}
      />
      <View
        style={{
          height: 60,
          width: '95%',
          //   backgroundColor: 'blue',
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/new/back.png')}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '90%',
            backgroundColor: '#10141C',
            marginTop: 150,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 20,
          }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
            Situation Awareness
          </Text>
          <Text style={{ color: '#C6C8CC', fontSize: 14, marginTop: 10 }}>
            {data?.questionnaireChallenge?.question}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            backgroundColor: '#10141C',
            marginTop: 20,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ color: '#C6C8CC', fontSize: 16, fontWeight: '500' }}>
              Progress
            </Text>
            <Text style={{ color: '#F5B200', fontSize: 16, fontWeight: '500' }}>
              {progress}%
            </Text>
          </View>

          <View
            style={{
              height: 8,
              width: '100%',
              backgroundColor: '#2C2E33',
              marginTop: 30,
              borderRadius: 10,
            }}>
            <View
              style={{
                height: '100%',
                width: progress,
                backgroundColor: '#246BFD',
                borderRadius: 10,
              }}></View>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            backgroundColor: '#10141C',
            marginTop: 20,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 20,
          }}>
          <Text style={{ color: '#C6C8CC', fontSize: 16, fontWeight: '500' }}>
            Answers
          </Text>
          {Data?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item?.select === true ? (
                    <Pressable
                      onPress={() => handleOptions(!item?.select, index)}
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: 'rgba(50, 186, 255, 0.08)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          borderWidth: 2,
                          borderRadius: 10,
                          borderColor: 'rgba(22, 177, 255, 1)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            height: 10,
                            width: 10,

                            borderRadius: 10,
                            backgroundColor: 'rgba(22, 177, 255, 1)',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}></View>
                      </View>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => handleOptions(!item?.select, index)}
                      style={{
                        height: 20,
                        width: 20,
                        borderWidth: 1.5,
                        borderRadius: 10,
                        borderColor: 'white',
                      }}></Pressable>
                  )}
                </View>

                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '500',
                    marginLeft: 10,
                    width: '80%',
                  }}>
                  {item?.text}
                </Text>
              </View>
            );
          })}

          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: 'rgba(44, 46, 51, 1)',
              marginTop: 20,
            }}></View>
        </View>
        <TouchableOpacity
          onPress={() => checkAnswer()}
          style={{
            height: 55,
            width: '90%',
            backgroundColor: 'red',
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 30,
            backgroundColor: 'rgba(36, 107, 253, 1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(35, 38, 47, 0.5)',
          }}>
          <View
            style={{
              width: '85%',
              backgroundColor: 'rgba(35, 38, 47, 1)',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Image
              style={{ height: 80, width: 80 }}
              source={require('../../../assets/new/check.png')}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: 'white',
                fontWeight: '700',
                marginTop: 20,
              }}>
              Wooo hooo!
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 1)',
                fontWeight: '500',
                marginTop: 10,
              }}>
              Congratulation Your challenge has been submitted successfully!
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 50,
                width: '90%',
                backgroundColor: 'red',
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 30,
                backgroundColor: 'rgba(36, 107, 253, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(35, 38, 47, 0.5)',
          }}>
          <View
            style={{
              width: '85%',
              backgroundColor: 'rgba(35, 38, 47, 1)',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Image
              style={{ height: 80, width: 80 }}
              source={require('../../../assets/new/close.png')}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: 'white',
                fontWeight: '700',
                marginTop: 20,
              }}>
              Ohh Noo!!!
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 1)',
                fontWeight: '500',
                marginTop: 10,
              }}>
              Bad luck!! Hey your submited answer was wrong Please try again.
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible1(false)}
              style={{
                height: 50,
                width: '90%',
                backgroundColor: 'red',
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 30,
                backgroundColor: 'rgba(36, 107, 253, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default PlayerQuestions;
