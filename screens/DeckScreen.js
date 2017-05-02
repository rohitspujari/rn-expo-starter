import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { ApiAiClient, ApiAiStreamClient} from "api-ai-javascript";
import { Button } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;

const client = new ApiAiClient({
  accessToken: '85c04797251a439992118766634ee64f',
  streamClientClass: ApiAiStreamClient
});





class DeckScreen extends Component {

  state = {
    text: '',
    conversation: ''
  }

  static navigationOptions = {
    drawerLabel: 'Deck'
  }

  componentDidMount() {

  }



  render () {
    //this.props.navigation.navigate('DrawerOpen')
    return (
      <View style={styles.container}>
      <View style={{flex: 6, borderWidth:0, padding: 15}}>
      <ScrollView style={{flex:1, padding:10, backgroundColor:'#eeece9', borderRadius: 3}} ref={(scrollView) => { _scrollView = scrollView; }}
      onContentSizeChange={(contentWidth, contentHeight)=>{
        //_scrollView.scrollToEnd({ animated: false});
      }}>
        <Text style={{alignSelf: 'flex-start', borderWidth: 0, }}>{this.state.conversation}</Text>
      </ScrollView>
      </View>

      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-30} style={{  flexDirection: 'row', borderWidth: 0, paddingLeft: 15, marginVertical: 10}}>
      <TextInput
        style={{ flex:7 ,borderColor: 'gray', borderWidth: 0, borderRadius: 3, padding: 10, backgroundColor:'#eeece9'}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}/>
        <Button buttonStyle={{borderRadius: 3}}
          onPress={() => {

            client.textRequest(this.state.text)
                .then((response) => {
                  //console.log(response)
                  let message = response.result.fulfillment.speech;
                  this.setState({
                    conversation: ( this.state.conversation + '\n' + this.state.text + '\n\n' + message),
                    text: ''
                  })
                })
                .catch((error) => { console.log(error)/* do something here too */})


          }}
          title="Send"
          color="#eeece9"

        />

      </KeyboardAvoidingView>

      </View>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 20,
    //justifyContent: 'center',
    //alignItems: 'center',
  }
};

export default DeckScreen;
