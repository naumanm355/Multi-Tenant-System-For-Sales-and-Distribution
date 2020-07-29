import React from 'react';

class test extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            products:[],
            product:{}
        }
        this.fetchProducts = this.fetchProducts.bind(this)
    }

    componentDidMount()
    {
        this.fetchProducts();
    }

    fetchProducts() {
            fetch('https://localhost:44377/api/products/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                // Content-Type: application/json
                'Accept': 'application/json'
                // 'charset': 'UTF-8'
            },
            mode: 'cors'
        }).then((response) => {
            console.log(response.status + "response" + "stattus text is" + response.statusText);
            if (response.status === 404) {
                alert("server error")
            }
            else {
                response.json().then(data => {  
                        console.log(data);
                        this.setState({
                            products:data.allProducts,                                                
                        })
                    }
                )
            }
        }).catch(error => alert(error));

    }



    render() {
        const { products, product } = this.state;
  return (
    <React.Fragment>
      <h1>Random Product</h1>
            
      {
        products.map(product => {
          const { name, price, category } = product;
          return (
            <div key={price}>
              <p>Name: {name}</p>
              <p>category: {category}</p>
              <hr />
            </div>
          );
        })    
    
      }
    </React.Fragment>
  )
}
}

export default test;