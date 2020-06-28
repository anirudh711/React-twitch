import React from 'react';
import {Field,reduxForm} from 'redux-form';
class StreamForm extends React.Component{

//submit form helper
onSubmit=(formValues)=> {
    this.props.onSubmit(formValues) ///calling parent component
}

//error showing up on screen helper
renderError({error,touched}){
    if(touched &&error){
        return (
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        );
    }
}
//input field renderer
renderInput=({input,label,meta})=>{
    const className=`field ${meta.error && meta.touched ? 'error':''}`;
 
    return (
        <div className={className}>
            <label>{label}</label>
             <input {...input}/>
            {this.renderError(meta)}
        </div>
       
    );
    }
    render(){
        console.log(this.props)
       return (
           <form onSubmit={this.props.handleSubmit(this.onSubmit)} 
           className="ui form error ">
               <Field name="title" component={this.renderInput} label="Enter title" />
               <Field name="description"  component={this.renderInput} label="Enter description"/>
               <button className="ui button primary">Submit</button>
           </form>
       );
    }
}

//validate module of the redux-form library that helps to validate forms and has its own functions.
const validate=(formValues)=>{
    const errors ={};
    if(!formValues.title){
        errors.title='You must enter a title'
    }
    if(!formValues.description){
        errors.description='You must enter a description'
    }
    return errors;
}

//redux form here acts as a connect() , has its own reducer but we have to wire it up
//to our native reducer
export default reduxForm({
    form: 'streamForm',
    validate:validate
})(StreamForm );
