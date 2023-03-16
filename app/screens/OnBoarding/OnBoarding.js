import React, { Fragment,useState ,useEffect} from 'react'
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image,
    TouchableOpacity
} from "react-native"
import { ScrollView } from 'react-native-gesture-handler'
import { OnBoarding } from '..'

//Consts
import { images, COLORS, FONTS, SIZES } from '../../consts'
const { onboarding1, onboarding2, onboarding3 } = images
//Dummy Data
const onboardings = [
    {
        id: "1",
        title: "Let's Travelling",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        img: onboarding1,
    },
    {
        id: "2",
        title: "Navigation",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        img: onboarding2,
    },
    {
        id: "3",
        title: "Destination",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        img: onboarding3,
    }
]
const Onboarding = () => {


    const scrollX=new Animated.Value(0)
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
// To check if user has finish scroll the onboarding pages

        scrollX.addListener(({ value }) => {

            console.log('value',value);
            
            if (Math.floor(value/SIZES.width)===onboardings.length - 1) {
                setCompleted(true)
            } 
          
        })

        return () => {
            console.log('Finish');
            
            scrollX.removeListener()
        }
     },[])
    const renderContent = () => {
        return <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEnabled
            // snapToInterval={5}
            snapToAlignment={"center"}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            onScroll={
                Animated.event([
                    {
                     nativeEvent:{contentOffset:{x:scrollX}}
                }
            ],{useNativeDriver:false})
            }

        >
            {
                onboardings.map((item) => {
                    return <View key={item?.id} style={{ flex: 1, width: SIZES.width }} >
                        {/* Image */}
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"

                        }}>
                            <Image
                                source={item.img}
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}


                            />
                        </View>
                        {/* Text */}
                        <View style={{
                            position: 'absolute',
                            bottom: "10%",
                            marginHorizontal:40
                        }}>
                            <Text
                                style={{
                                    ...FONTS.h2,
                                    color: COLORS.gray,
                                    textAlign: "center",
                                      marginBottom:10
                            }}
                            >{item.title}</Text>
                            <Text
                               style={{
                                ...FONTS.body3,
                                color: COLORS.gray,
                                 textAlign:"center"
                        }}
                            >{item.description}</Text>
                        </View>

                        {/* Button  */}
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.blue,
                            position: "absolute",
                            width: 150,
                            right: 0,
                            bottom: 0,
                            height: 60,
                            alignItems: "center",
                            justifyContent: "center",
                            borderTopLeftRadius: 30,
                             borderBottomLeftRadius:30
                        }} onPress={() => {
                            console.log("Button on pressed")
                        }}>
                            <Text
                                style={{
                                    ...FONTS.h2,
                                    color:COLORS.white

                            }}
                            >{ completed?"Let's go":"Skip"}</Text>
                        </TouchableOpacity>
                    </View>
                })
            }
        </Animated.ScrollView >
    }
    const renderDot = () => {
        const dotPosition=Animated.divide(scrollX,SIZES.width)
        return   <View style={styles.dotContainer}>{
            onboardings.map((item,index) => {
                const opacity = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate:"clamp"
                })
                const dotSize = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [SIZES.base, 17, SIZES.base],
                    extrapolate:"clamp"
                })
                return <Animated.View
                
                    opacity={opacity}
                    key={item.id} style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    backgroundColor: COLORS.blue,
                        margin: 5,
                        width: dotSize,
                     height:dotSize
                }}></Animated.View>
            })
                }</View>
    }
    return <SafeAreaView style={styles.container}>
        {
            renderContent()
        }
        {
            renderDot()
        }


    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: COLORS.white,

    },
    dotContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom:SIZES.height>700?'30%':'20%'
    }
})

export default Onboarding;