import React, { Component } from "react"
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  NativeModules,
  TouchableOpacity } from "react-native"

const { RNTwitterSignIn } = NativeModules

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "lQGMPC4KVYqRxja9wJHjK3Gfe",
  TWITTER_CONSUMER_SECRET: "plHm5mffv1Rmi7nE3wQcLLFnWWNhgKXNSUa329sLgd7563swsf"
}

export default class TwitterButton extends Component {
  state = {
    isLoggedIn: false
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        // console.log("logindata"+JSON.stringify(loginData)+"hashtagkey="+this.props.store.hashtag_key)
        const { authToken, authTokenSecret } = loginData
        if (authToken && authTokenSecret) {
          console.log("<<<<<login data<<<<<",authToken, authTokenSecret)
        //   this.setState({isLoading:true})
          // let response = await requestAccessToken(HTTP_METHOD, "https://api.twitter.com/1.1/search/tweets.json?count=100&result_type=recent&q="+this.props.store.hashtag_key,authToken,authTokenSecret);
          // let twitterData = {
          //   'authToken': authToken,
          //   'authTokenSecret':authTokenSecret
          //   }
        //   await setItemInAsyncStore("twitterData",JSON.stringify(twitterData))
        //   this.setState({ twitterData: response.statuses,loggedIn:true , isLoading:false });     
           }
      })
      .catch(error => {
        console.log(">>>>>ERROR>>>>",error )
        alert("Can't connect to twitter app")
      }
    )
  }

  handleLogout = () => {
    console.log("logout")
    RNTwitterSignIn.logOut()
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <View style={this.props.style}>
        {isLoggedIn
          ? <TouchableOpacity onPress={this.handleLogout}>
              <Text>Log out</Text>
            </TouchableOpacity>
          : <Button name="logo-twitter" style={styles.button} onPress={this._twitterSignIn} title="Login with Twitter">
            </Button>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1b95e0',
    color: 'white',
    width: 200,
    height: 50
  }
})
