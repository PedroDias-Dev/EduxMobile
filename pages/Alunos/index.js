import React, { Component } from 'react';
import { StyleSheet,Text,View,TouchableOpacity,Image,Alert,ScrollView,FlatList,} from 'react-native';
import TopBar from '../../components/TopBar';


// let url = 'https://5fdbbfda91f19e0017334b1f.mockapi.io/atualizacao'

// const [alunos, setAlunos] = useState([]);



// useEffect(() => {
//   listarAlunos();
// }, []); 

// const listarAlunos = () => {
//   fetch('https://5fdbbfda91f19e0017334b1f.mockapi.io/atualizacao')
//       .then(response => response.json())
//       .then(data => {
//           setAlunos(data.data)
//           console.log(data.data);
//       })
//       .catch(err => console.error(err));
// }


export default class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "Andre Silva",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Benaias Oliveira",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Caio Jesus",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "David Amarante",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "Eduarda Castro",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "Igor Amaral", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "Lucas Matios", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "Mateus Amaral",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "Mateus Bernado",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "Matheus Miranda",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
      ]
    };
  }


  renderItem = ({item}) => {
    return (
    <View>
     
      <TouchableOpacity >
         
        <View style={styles.row}>
       
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
        
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.mblTxt}>Mobile</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>      
    );
  }

  render() {
    return(
  
      
      <View>
    <TopBar/>
      <View style={{ flex: 1 }} >
        <FlatList 
          extraData={this.state}
          data={this.state.calls}
          // data ={alunos}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
      </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});