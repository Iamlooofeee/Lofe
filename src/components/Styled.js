import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import FontAwesome from 'react-fontawesome';
import {Button, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui/Progress';
import Zoom from 'material-ui/transitions/Zoom';
import urls from '../routes';

const CenterRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${props => props.justifyContent || 'space-between'}
  align-content: center;
`;

const StyledRating = styled.div`
  display: ${props => (!props.centered ? 'flex' : 'inline-block')};
  justify-content: ${props => (!props.centered ? 'center' : null)};
  line-height: 0;
`;

const Center = styled.div`
  display: flex;
  height: ${props => props.height || 'auto'};
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

let Status = ({normalMessage, status}) => {
  switch (status) {
    case 'normal':
      return (
        <Button type="submit" bsStyle="primary">
          {normalMessage}
        </Button>
      );
    case 'pending':
      return <CircularProgress />;
    case 'success':
      return (
        <Button type="submit" disabled={true} bsStyle="success">
          your review added
        </Button>
      );
    default:
      return (
        <Button type="submit" bsStyle="danger">
          {status.split('_').join(' ')}
        </Button>
      );
  }
};
Status = connect(({status}) => {
  return {status};
})(Status);

const Point = ({input, remove, label, type, meta: {touched, error}}) => (
  <div>
    <div>
      <CenterRow>
        <StyledInput
          width="80%"
          margin="10px 0"
          placeholder={label}
          {...input}
          type={type}
        />
        <FontAwesome style={{margin: 'auto'}} name="times" onClick={remove} />
      </CenterRow>
      {touched && error && <StyledError>{error}</StyledError>}
    </div>
  </div>
);

<StarRatings />;

const Rating = ({centered, rating, onChange, isSelectable}) => (
  <StyledRating centered={centered}>
    <StarRatings
      rating={rating}
      isSelectable={isSelectable || 'false'}
      changeRating={onChange}
      starRatedColor="#c5ea2e"
      numberOfStars={5}
      starDimension="20px"
      starSpacing="2px"
    />
  </StyledRating>
);

const StyledError = styled.div`
  text-align: center;
  color: red;
`;

const StyledInput = styled.input`
  border-radius: 1px;
  display: block;
  padding: 10px 30px;
  border: 1px solid #888;
  transition: all 0.3s ease;
  :focus {
    outline: none;
    transform: translate(0, 1px);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  }
  height: ${props => props.height || 'auto'};
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0 0 0 0'};
`;

const StyledPrice = styled.div`
  float: right;
  display: inline-block;
  font-weight: bold;
  line-height: 20px;
  span {
    font-size: 30px;
  }
`;

const Price = ({price, currency}) => (
  <StyledPrice>
    <span>{price}</span> {currency}
  </StyledPrice>
);

const StyledTextArea = styled.textarea`
  border-radius: 1px;
  transition: all 0.3s ease;
  :focus {
    outline: none;
    transform: translate(0, 1px);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  }
  border: 1px solid #888;
  width: 100%;
  padding: 10px 30px;
  height: 200px;
  margin: ${props => props.margin || '0 0 0 0'};
`;

const Error = ({error}) => (
  <StyledError>
    <Zoom in={true}>
      <div>{error}</div>
    </Zoom>
  </StyledError>
);

const StyledGithubButton = styled.div`
  display: flex;
  align-content: center;
  margin: 40px auto;
  cursor: pointer;
  text-align: center;
  border: 1px solid transparent;
  padding: 15px 30px;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #fff;
  background-color: #353535;
  span.fab {
    font-size: 1.5em;
    margin: 0 10px;
  }
`;

const GithubButton = ({type}) =>
  type === 'signin' ? (
    <a href={'http:localhost:3030/auth/github'}>
      <StyledGithubButton>
        <span className="fab fa-github" />
        <span>sign in via github</span>
      </StyledGithubButton>
    </a>
  ) : (
    <a href={'http:localhost:3030/auth/github'}>
      <StyledGithubButton>
        <span className="fab fa-github" />
        <span>sign up via github</span>
      </StyledGithubButton>
    </a>
  );

export {
  StyledError,
  Center,
  StyledInput,
  StyledTextArea,
  CenterRow,
  Rating,
  Price,
  Point,
  Status,
  Error,
  GithubButton
};
