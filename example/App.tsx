import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View, Button} from 'react-native'
import {withAriaDescription} from 'react-native-aria-description'

const CustomButton = withAriaDescription(Button, {web: {useEffect: true}})

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <CustomButton
        title="Press me"
        aria-description="Pressing this button will print a statement in the console."
        onPress={() => console.log('button has been pressed')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
