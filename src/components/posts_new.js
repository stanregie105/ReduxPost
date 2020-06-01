import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import { createPost} from '../actions';

class PostsNew extends Component {
   renderField(field){
       const {meta:{ touched, error}} = field;
       const className =`form-group ${touched && error?'has-danger':''}`;
       return(
           <div className={className}>
               <label>{field.label}</label>
            <input
             className="form-control"
            type="text"
            //makes various event handlers to be available as props for the input
             {...field.input}
            />
        <div className="text-help">
           {touched ? error: ''}
        </div>

            </div>
       )

   }
   onSubmit(values){
       this.props.createPost(values,()=>{
          this.props.history.push('/');

       });
   }

    render() {
        //ppt passed to the component on bebalf of redux-form
        const { handleSubmit} = this.props;
        return(
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
              label="Title"
              name="title"
              component={this.renderField}
            />
            <Field
                label="Categories"
                name="categories"
                component={ this.renderField}
            />
             <Field
                label="Content"
                name="content"
                component={ this.renderField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </form>
        );
    }
}

function validate(values){
   const errors={};
   // Validate the inputs from the values
   if(!values.title){
       errors.title = 'enter a title';
   }
   if(!values.categories){
       errors.categories = 'enter some categories';
   }
   if(!values.content){
       errors.content = 'enter some contents'
   }

   // if errors is empty, form is fine to submit
   // if error has any property, redux form assumes invalid form
   return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
}) (
connect(null, {createPost})(PostsNew)
);