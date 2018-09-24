import React, { Component } from 'react';
import { StyleSheet, Text, View, Button,Alert } from 'react-native';

export default class App extends Component {
  
  //state = {myState: 'The text can be changed'}
  state = { dataS: '',
            isLoading : true,
          }

  model =  {
            __metadata: {
                uri: "https://services.odata.org/(S(1pvfcxajki3ouml43k5wnex3))/V2/OData/OData.svc/Products(0)",
                type: "ODataDemo.Product"
            },
            ID: 0,
            Name: "Oven",
            Description: "Classic One",
            ReleaseDate: null,
            DiscontinuedDate: null,
            Rating: 4,
            Price: "2.5",
            Category: {
                __deferred: {
                    uri: "https://services.odata.org/(S(1pvfcxajki3ouml43k5wnex3))/V2/OData/OData.svc/Products(0)/Category"
                }
            },
            Supplier: {
                __deferred: {
                    uri: "https://services.odata.org/(S(1pvfcxajki3ouml43k5wnex3))/V2/OData/OData.svc/Products(0)/Supplier"
                }
            }
        }


post_data = () => {



        fetch('https://services.odata.org/V2/(S(1pvfcxajki3ouml43k5wnex3))/OData/OData.svc/Products', {
          
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.model),
        });

}

 // const headers = new Headers();
    
 //     headers.append('Content-Type', 'application/json')
 //     headers.append('Accept','application/json')


// const options = {
//    method : 'POST',
//    headers,
//    body : JSON.stringify(model),
 
//  }

  //const request = new Request ('https://services.odata.org/V2/(S(1pvfcxajki3ouml43k5wnex3))/OData/OData.svc/Products',options)



//Fucntion
//updateState = () => this.setState({myState: 'New Data has arrived' })  


  //Get Request 
  componentDidMount = () => {
      fetch('https://services.odata.org/V2/(S(1pvfcxajki3ouml43k5wnex3))/OData/OData.svc/Products?$format=json', {
         method: 'GET',
         'Content-Type': 'application/json'

      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson.d);
         
         this.setState({
            dataS: responseJson.d,
            isLoading: false,
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }








  render() {
   


   if(this.state.isLoading) {
       return (
             
             <View style={styles.container}>
                 <Text>Please wait </Text>
             </View>
              )

}  else {

     let products = this.state.dataS.map((val, key)=>{
         
// Seems like someone is already maniputaling the API :)

if(val.Name!= "TEEEESSSTT")
    {

      
         return <View key={key} style={styles.item} >
            
    
          <Text style={{fontWeight: "bold",fontSize: 13,}} > {val.Name} </Text>
        
        </View>

  }

       });





    return (
      

     // Listing the products on the screen
            
 <View style={{flex: 1,}}>  

       <View style={{flex: 1, flexDirection: 'row',alignItems: 'flex-start',flexWrap: 'wrap',justifyContent: 'space-between', margin: 50 }}>
          
              {products}
              
            </View>




  <View>

        <Button onPress={() => {
                this.post_data();
                alert("did it")
              }}
              title="Press To ADD Products"/>



  </View>


</View>

//<Button
//  onPress={() => {
//    Alert.alert('You tapped the button!');
//  }}
//  title="Press Me"/>


//      </View>
   );







  
}













  }

}









const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

item: {
 
    
    height : 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',

 
}


});
