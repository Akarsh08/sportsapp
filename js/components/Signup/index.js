import React from "react";
import { View, Text, Image } from "react-native";
import {  Container,  Content,  Form,  Item,  Input,  Label,  Button, H1} from "native-base"; 
import { NavigationActions } from "react-navigation";

import Db from '../../Db';
import Styles from "./Styles";
import I18n from 'ex-react-native-i18n';
import NavStore from'../../NavStore';
Locales=require('../../Locale');
const background = require("../../assets/login.jpeg");
var auth;
I18n.fallback=true;

class SignUp extends React.Component {
  constructor(props){
    super(props);
    auth=Db.getAuth(); 
    this.state={
      username: "",
      Password: "",
      cnfPass: "",
      Email: ""
    }
    auth.signOut();
  }
  addUser(){    
    if(this.state.Password==this.state.cnfPass){
      auth.createUserWithEmailAndPassword(this.state.Email, this.state.Password).then(()=>{
        auth.signInWithEmailAndPassword(this.state.Email, this.state.Password).then((user)=>{
          user.updateProfile({displayName: this.state.username});
          this.props.navigation.dispatch(NavigationActions.reset(
            {
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "Home"
                })
              ]
            }
          ));
        });
      }).catch((error)=>{
        var errMessage = error.message;
        alert(errMessage);
      });
    }
  }
  render() {
    I18n.locale = NavStore.locale;
    return <Container>
      <Image source={background} style={Styles.mainContainer}>
        <Content>
          <View style={Styles.logo}>
            <H1 style={Styles.ip}> SportsBuzz</H1>
          </View>
          <View style={Styles.formContainer}>
            <Form>
              <Item floatingLabel>
                <Label>{I18n.t('usrnm')}</Label>
                <Input style={Styles.ip} onChangeText={username => this.setState( { username } )} />
              </Item>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input style={Styles.ip} onChangeText={Email => this.setState( { Email } )} />
              </Item>
              <Item floatingLabel>
                <Label>{I18n.t('psswrd')}</Label>
                <Input style={Styles.ip} secureTextEntry={true} onChangeText={Password => this.setState( { Password } )} />
              </Item>
              <Item floatingLabel>
                <Label>{I18n.t('cnfrmPsswrd')}</Label>
                <Input style={Styles.ip} secureTextEntry={true} onChangeText={cnfPass => this.setState( { cnfPass } )} />
              </Item>
            </Form>
            <Button style={Styles.but} block primary onPress={() => this.addUser()}>
              <Text style={Styles.ip}>{I18n.t('signUp')}</Text>
            </Button>
          </View>
        </Content>
      </Image>
    </Container>;
  }
}

export default SignUp;
