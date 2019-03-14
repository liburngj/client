import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";


const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;
const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Birthday = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-bottom: 10px;
`;
const CreationDate = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-bottom: 10px;
`;
const Username = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-bottom: 10px;
`;
export class EditProfile extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            id: null,
            username: null,
            status: null,
            birthday: null,
            creationDate: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    SaveAll() {
        fetch(`${getDomain()}/users/${this.props.match.params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                birthday: this.state.birthday
            })
        })
            .then(response => response.json())
            .then(returnedUser => {
                if(returnedUser.status === 404){
                    alert("User id not found");
                }
                else if(returnedUser.status === 500){
                    alert("username already taken");
                }
                else{
                    this.props.history.push(`/profile/${this.props.match.params.id}`);
                }
                // store the token into the local storage
                // user login successfully worked --> navigate to the route /game in the GameRouter
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the login: ${err.message}`);
                }
            });
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <h2> Here you can edit your profile! </h2>
                        <Label>Username</Label>
                        <Container>
                            <div>
                                <InputField
                                    placeholder="Enter here your new username"
                                    onChange={e => {
                                        this.handleInputChange("username", e.target.value);
                                    }}
                                />
                            </div>
                        </Container>
                        <Label>Birthday</Label>
                        <Container>
                            <div>
                                <InputField
                                    placeholder="Enter here your new birthday"
                                    onChange={e => {
                                        this.handleInputChange("birthday", e.target.value);
                                    }}
                                />
                            </div>
                        </Container>
                        <div>
                            <ButtonContainer>
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        return  this.props.history.push('/profile');
                                    }}
                                >
                                    Back
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer>
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        this.SaveAll();
                                    }}
                                >
                                    Save changes
                                </Button>
                            </ButtonContainer>
                        </div>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
        //});
    }
}

export default withRouter(EditProfile)