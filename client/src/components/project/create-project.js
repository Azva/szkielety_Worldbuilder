import React, { useState } from "react";
import axios from 'axios';
import ProjectForm from "./ProjectForm";

const CreateProject = () => {
    const [formValues] =
        useState({ name: '' })
    // onSubmit handler
    const onSubmit = projectObject => {
        console.log(projectObject)
        axios.post(
            'http://localhost:5000/api/projects/post',
            projectObject)
            .then(res => {
                if (res.status === 200){
                    alert('Stworzono nowy projekt')
                    window.location = "/";
                }
                else{
                    Promise.reject()
                }
            })
            .catch(err => alert('error: '+err))
    }

    // Return form
    return (
        <ProjectForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Stworz nowy projekt
        </ProjectForm>
    )
}

// Export CreateStudent Component
export default CreateProject
