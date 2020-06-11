import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
const initState = {
  description: '',
  url: '',
};
const CreateLink = () => {
  useEffect(() => {
    if (data) {
      history.push('/');
    }
  });

  const history = useHistory();
  const [form, setForm] = useState(initState);

  const [post, { data }] = useMutation(POST_MUTATION);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { description, url } = form;
  const onSubmit = (e) => {
    e.preventDefault();
    post({ variables: { description, url } });
    setForm({ ...form, initState });
  };
  // console.log(data);
  return (
    <div style={{ width: 500, margin: '0 auto' }}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-column mt3">
          <input
            name="description"
            className="mb2"
            value={description}
            onChange={onChange}
            type="text"
            placeholder="A description for the link"
            required
          />
          <input
            name="url"
            className="mb2"
            value={url}
            onChange={onChange}
            type="text"
            placeholder="The URL for the link"
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default CreateLink;
