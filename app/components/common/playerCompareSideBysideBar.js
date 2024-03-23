import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Layout, Colors, Fonts, customTheme } from '../../constants';

const PlayerSideBySideBarGraph = ({ pgsData }) => {
  // let content
  let content1 = [];
  // let content2 = [];
  //
  if (pgsData !== null) {
    var midVal = 10;
    pgsData.map((obj, index) => {
      //
      if (index == 0) {
        //
        var rightObj = pgsData[1];
        for (const key in obj) {
          var leftVal = obj[key];
          // var fillWidth = leftVal > 10 ? 35 + parseFloat(leftVal) : 45 - leftVal;
          //// console.log('widthfill', fillWidth);
          var rightVal = 0;
          if (rightObj !== null && rightObj !== undefined) {
            rightVal = rightObj[key];
          }
          // ;
          content1.push(
            <View
              style={{
                width: '100%',
                height: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 3,
                // backgroundColor: 'red',
              }}
            >
              <View
                style={{
                  width: '40%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {leftVal !== undefined && leftVal > 0 ? (
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.compareBar,
                      paddingRight: 6,
                      fontFamily: Fonts.Bold,
                    }}
                  >
                    {leftVal}
                  </Text>
                ) : null}
                {leftVal !== undefined && leftVal > 0 ? (
                  <View
                    style={{
                      width:
                        leftVal >= midVal
                          ? leftVal > 90
                            ? `${90}%`
                            : `${30 + parseFloat(leftVal)}%`
                          : `${midVal + parseFloat(leftVal)}%`,
                      // width: '100%',
                      backgroundColor: Colors.compareBar,
                      height: 12,
                      maxWidth: '90%',
                    }}
                  ></View>
                ) : (
                  <View
                    style={{
                      width: '10%',
                      backgroundColor: Colors.emptyBar,
                      height: 12,
                    }}
                  ></View>
                )}
              </View>
              <View
                style={{
                  width: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: customTheme.colors.light,
                    fontSize: 12,
                    fontFamily: Fonts.Bold,
                  }}
                >
                  {key}
                </Text>
              </View>

              <View
                style={{
                  width: '40%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                {rightVal !== undefined && rightVal > 0 ? (
                  <View
                    style={{
                      width:
                        rightVal >= midVal
                          ? rightVal > 90
                            ? `${90}%`
                            : `${30 + parseFloat(rightVal)}%`
                          : `${midVal + parseFloat(rightVal)}%`,
                      backgroundColor: Colors.compareRightBar,
                      height: 12,
                      maxWidth: '90%',
                    }}
                  ></View>
                ) : (
                  <View
                    style={{
                      width: '10%',
                      backgroundColor: Colors.emptyBar,
                      height: 12,
                    }}
                  ></View>
                )}
                {rightVal !== undefined && rightVal > 0 ? (
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.compareRightBar,
                      paddingLeft: 8,
                      fontFamily: Fonts.Bold,
                    }}
                  >
                    {rightVal}
                  </Text>
                ) : null}
              </View>
            </View>
          );
        }
      } else {
        //
        var leftObj = pgsData[0];
        for (const key in obj) {
          var leftVal = 0;
          if (leftObj !== null && leftObj !== undefined) {
            leftVal = leftObj[key];
          }
          //
          var rightVal = obj[key];

          if (leftObj !== null) {
            //
            if (!leftObj.hasOwnProperty(key)) {
              content1.push(
                <View
                  style={{
                    width: '100%',
                    height: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 3,
                    // backgroundColor: 'red'
                  }}
                >
                  <View
                    style={{
                      width: '40%',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    {leftVal !== undefined && leftVal > 0 ? (
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.compareBar,
                          paddingRight: 6,
                          fontFamily: Fonts.Bold,
                        }}
                      >
                        {leftVal}
                      </Text>
                    ) : null}
                    {leftVal !== undefined && leftVal > 0 ? (
                      <View
                        style={{
                          width:
                            leftVal >= midVal
                              ? leftVal > 90
                                ? `${90}`
                                : `${30 + parseFloat(leftVal)}%`
                              : `${midVal + parseFloat(leftVal)}%`,
                          backgroundColor: Colors.compareBar,
                          height: 12,
                          maxWidth: '90%',
                        }}
                      ></View>
                    ) : (
                      <View
                        style={{
                          width: '10%',
                          backgroundColor: Colors.emptyBar,
                          height: 12,
                        }}
                      ></View>
                    )}
                  </View>
                  <View
                    style={{
                      width: '10%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: customTheme.colors.light,
                        fontSize: 12,
                        fontFamily: Fonts.Bold,
                      }}
                    >
                      {key}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '40%',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    {rightVal !== undefined && rightVal > 0 ? (
                      <View
                        style={{
                          width:
                            rightVal >= midVal
                              ? rightVal > 90
                                ? `${90}%`
                                : `${30 + parseFloat(rightVal)}%`
                              : `${midVal + parseFloat(rightVal)}%`,
                          backgroundColor: Colors.compareRightBar,
                          height: 12,
                          maxWidth: '90%',
                        }}
                      ></View>
                    ) : (
                      <View
                        style={{
                          width: '10%',
                          backgroundColor: Colors.emptyBar,
                          height: 12,
                        }}
                      ></View>
                    )}
                    {rightVal !== undefined && rightVal > 0 ? (
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.compareRightBar,
                          paddingLeft: 8,
                          fontFamily: Fonts.Bold,
                        }}
                      >
                        {rightVal}
                      </Text>
                    ) : null}
                  </View>
                </View>
              );
            }
          } else {
            //
            // if (!leftObj.hasOwnProperty(key)) {
            content1.push(
              <View
                style={{
                  width: '100%',
                  height: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 3,
                  // backgroundColor: 'red'
                }}
              >
                <View
                  style={{
                    width: '40%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {leftVal !== undefined && leftVal > 0 ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.compareBar,
                        paddingRight: 6,
                        fontFamily: Fonts.Bold,
                      }}
                    >
                      {leftVal}
                    </Text>
                  ) : null}
                  {leftVal !== undefined && leftVal > 0 ? (
                    <View
                      style={{
                        width:
                          leftVal >= midVal
                            ? leftVal > 90
                              ? `${90}%`
                              : `${30 + parseFloat(leftVal)}%`
                            : `${midVal + parseFloat(leftVal)}%`,
                        backgroundColor: Colors.compareBar,
                        height: 12,
                        maxWidth: '90%',
                      }}
                    ></View>
                  ) : (
                    <View
                      style={{
                        width: '10%',
                        backgroundColor: Colors.emptyBar,
                        height: 12,
                      }}
                    ></View>
                  )}
                </View>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: customTheme.colors.light,
                      fontSize: 12,
                      fontFamily: Fonts.Bold,
                    }}
                  >
                    {key}
                  </Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {rightVal !== undefined && rightVal > 0 ? (
                    <View
                      style={{
                        width:
                          rightVal >= midVal
                            ? rightVal > 90
                              ? `${90}%`
                              : `${30 + parseFloat(rightVal)}%`
                            : `${midVal + parseFloat(rightVal)}%`,
                        backgroundColor: Colors.compareRightBar,
                        height: 12,
                        maxWidth: '90%',
                      }}
                    ></View>
                  ) : (
                    <View
                      style={{
                        width: '10%',
                        backgroundColor: Colors.emptyBar,
                        height: 12,
                      }}
                    ></View>
                  )}
                  {rightVal !== undefined && rightVal > 0 ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.compareRightBar,
                        paddingLeft: 8,
                        fontFamily: Fonts.Bold,
                      }}
                    >
                      {rightVal}
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          }
        }
      }
      // return (
      //     <>

      //     </>
      //     // content2

      // )
    });
  }
  return (
    <>
      {content1}
      {/* {content2} */}
    </>
  );
};

export { PlayerSideBySideBarGraph };
