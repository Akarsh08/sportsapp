import React from 'react';
import {Content, List, ListItem, Spinner, Text, View} from 'native-base';
import schedule from '../../Services/csgo';
import NavStore from '../../NavStore';
import Styles from './Styles';

class CSGOSchedule extends React.Component {
  constructor(props){
    super(props);
    this.state={
        tournaments:''
    }
  }
  componentWillMount(){
    schedule.getTournaments().then(res => {
      this.setState({tournaments: res });
    }, (err)=>{console.log(err,err.status)});  
  }

  render(){
    if(this.state.tournaments===''){
      return <Content>
        <View style={Styles.dailyLoad} >
          <Text>Loading Tournament List</Text>
          <Spinner color="blue" />
        </View>
      </Content>;
    } else{
      return <Content>
        <List dataArray={this.state.tournaments} renderRow={tournament => <ListItem onPress={()=>{NavStore.setTourId(tournament.id); this.props.navigation.navigate('CSGOTourSchedule')}}>
          <Text>{tournament.name}</Text>
        </ListItem>} />
      </Content>;
    }
  }
}

export default CSGOSchedule;