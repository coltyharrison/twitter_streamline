import React, { Component } from 'react';
import { Form, Button, TextArea, Modal, Header } from 'semantic-ui-react';
import axios from 'axios';


// component for rendering a submitting a new tweet

class CreateTweetBox extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      modalOpen: false
    }
  }

  handleSubmit(e) {
    console.log('function');
    e.preventDefault();
    axios.post('/createTweet', {value: this.state.value})
    .then(() => {
      this.setState({ value: '' })
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

  handleClose = (e) => this.setState({
    modalOpen: false,
  })

  render() {
    return (
      <div>
        <h3>{'Share A New Tweet!'}</h3>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <TextArea value={this.state.value} onChange={this.handleChange.bind(this)} rows="3"></TextArea>
          </Form.Field>
          <Modal
            trigger={<Button type="submit" onClick={this.handleOpen}>Submit</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size='small'>
          <Header icon='checkmark' content='Sucess!' />
          <Modal.Content>
            <h3>Your tweet was sent out into the world!</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleClose} inverted>
              OK
            </Button>
          </Modal.Actions>
        </Modal>
        </Form>
        </div>
    )
  }
}

export default CreateTweetBox;
