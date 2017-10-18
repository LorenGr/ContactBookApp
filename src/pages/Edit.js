import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import find from 'lodash.find';
import Paper from 'material-ui/Paper';
import ListDelete from '../components/ListDelete';
import Avatar from 'material-ui/Avatar';
import FormGroup from 'material-ui/Form/FormGroup';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import ImageUpload from '../components/ImageUpload';

const styleSheet = {
    title: {
        flex: 1
    },
    form: {
        paddingTop: 64,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 5
    },
    field: {
        margin: "16px 5%",
        width: '90%'
    },
    avatar: {
        margin: '0 auto',
        width: 128,
        height: 128,
        borderRadius: '50%'
    }
};

const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
    <TextField helperText={label} placeholder={label}
               label={touched && error} fullWidth
               {...input}
               {...custom}
    />
);

class renderImageUpload extends React.Component {
    render() {
        const {input: {value, onChange}, ...custom} = this.props
        return (
            <ImageUpload {...custom} onChange={file => {
                onChange(file);
            }} value={value}/>
        );
    }
}

const ProfileBar = ({editMode, onCancel, onDelete, pristine, reset, submitting, invalid, classes, title}) => (
    <AppBar color="default" position="fixed">
        <Toolbar>
            <IconButton type="button"
                        onClick={onCancel}
                        aria-label="Cancel">
                <ClearIcon/>
            </IconButton>
            <Typography className={classes.title} type="title">
                {editMode ? 'Edit' : 'Create'} Profile
            </Typography>
            {editMode ? <IconButton onClick={onDelete}
                                    className={classes.icon}
                                    type="button"
                                    aria-label="Delete">
                <DeleteForeverIcon/>
            </IconButton> : null}

            <IconButton className={classes.icon}
                        type="submit"
                        disabled={invalid || submitting || pristine}
                        aria-label="Save">
                <DoneIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>

);

const ProfileView = ({classes, editMode}) => (
    <FormGroup className={classes.form}>
        {/*<Field className={classes.avatar} name="picture" label="Avatar" component={renderImageUpload}/>*/}
        <Field className={classes.field} name="first_name" label="First Name" component={renderTextField}/>
        <Field className={classes.field} name="last_name" label="Surname" component={renderTextField}/>
        <Field className={classes.field} name="job_title" label="Job Title" component={renderTextField}/>
        <Field className={classes.field} name="company" label="Company" component={renderTextField}/>
        <Field className={classes.field} name="email" label="Email" component={renderTextField}/>
        <Field className={classes.field} name="address" label="Address" component={renderTextField}/>
        <Field className={classes.field} name="phone_number" label="Telephone / Mobile" component={renderTextField}/>
    </FormGroup>
);

export class Edit extends React.Component {
    form_type;

    constructor(props) {
        super(props);
        this.form_type = props.form_type;

        if (this.form_type === "edit" && !props.initialValues)
            this.props.dispatch({type: "ITEM_FETCH", id: props.form_id});

        this.submitHandler = this.submitHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    submitHandler(values) {
        this.props.dispatch({
            type: "ITEM_" + this.form_type.toUpperCase(),
            values
        });
        this.props.dispatch(goBack());
    }

    cancelHandler() {
        this.props.dispatch(goBack());
    }

    deleteHandler() {
        this.props.dispatch({
            type: "ITEM_DELETE_MODAL_SHOW",
            id: this.props.form_id
        });
    }

    render() {
        const isEditMode = this.form_type === 'edit';
        return (
            <Paper className="container" elevation={0} square={true}>
                <ListDelete id="deleteDialog"/>
                <form id="editForm" onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <ProfileBar editMode={isEditMode}
                                {...this.props}
                                onDelete={this.deleteHandler}
                                onCancel={this.cancelHandler}/>
                    <ProfileView editMode={isEditMode} {...this.props} />
                </form>
            </Paper>
        );
    }
}

// validate: function (values) {
//     let errors = {};
//     if (!values.recipient) {
//         errors.recipient = "Please add a recipient to your email.";
//     }
//     return errors;
// }
const EditForm = reduxForm({
    form: 'item_edit'
})(withStyles(styleSheet)(Edit));

function mapEditStateToProps(state, own_props) {

    let form_data = find(
        state.items.listDetails,
        {'_id': own_props.params.id}
    );

    const form_state = {
        form_type: own_props.params.id ? 'edit' : 'add',
        form_id: own_props.params.id,
    };
    if (form_data) form_state.initialValues = form_data;
    return form_state;
}


export default connect(mapEditStateToProps)(EditForm);