import {
    Box,
    Button,
    Group,
    MantineProvider,
    Stepper,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableUploadFile } from '../../cmp/table-upload-file/tableUploadFile';
import { createProjectFromFile,updateProjectCSV } from '../../serverApi/rest/projectApi';

import './formNewProjectCsv.scss';

export function FormNewProjectCSV() {
    const [active, setActive] = useState(0);
    const [array, setArray] = useState([]);
    const [fileToSend, setFileToSend] = useState(null);

    const navigate = useNavigate();

    function backPrevPage() {
        navigate(-1);
    }

    const handleSubmission = async (values) => {
        const project = {
            title: values.title,
            description: values.description,
            file: {},
            userEmail: values.userEmail,
        };

        console.log("project", project);
        const res = await createProjectFromFile(project);
        console.log("res", res);
        const resUpdate = await updateProjectCSV(res.projectId,fileToSend);
        console.log("resUpdate", resUpdate);

        // send the user to /project/:projectId
        navigate(`/project/${res.projectId}`);
    };

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            file: [],
            userEmail: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    title:
                        values.title.trim().length < 3
                            ? 'Title must include at least 3 characters'
                            : null,
                    description:
                        values.description.length < 6
                            ? 'Description must include at least 6 characters'
                            : null,
                };
            }

            if (active === 1) {
                if (array.length === 0) {
                    return {
                        file: 'Please upload a file',
                    };
                }
            }

            if (active === 2) {
                return {
                    userEmail:
                        values.userEmail.trim().length < 3
                            ? 'Email must include at least 3 characters'
                            : null,
                };
            }

            return {};
        },
    });

    form.onSubmit(handleSubmission);

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <div>
                <div className="title-project title-header">
                    <span>
                        <ArrowBackIcon
                            onClick={backPrevPage}
                            style={{
                                borderRadius: '50%',
                                backgroundColor: '#222c45',
                                color: '#fff',
                                padding: '8px',
                                fontSize: '50px',
                                position: 'absolute',
                                left: '20px',
                                top: ' 105px',
                                cursor: 'pointer',
                            }}
                        />
                    </span>
                    New Project From File
                </div>
            </div>
            <div className="form-new-project">
                <div className="form-new-project-container-csv">
                    <MantineProvider
                        theme={{
                            colors: {
                                brand: [
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                    '#70d8bd',
                                ],
                            },
                            primaryColor: 'brand',
                        }}
                    >
                        <Stepper
                            active={active}
                            breakpoint="sm"
                            color={'#70d8bd'}
                        >
                            <Stepper.Step
                                label="First step"
                                description="New project settings"
                                className="step"
                            >
                                <h3>Create new project</h3>
                                <TextInput
                                    label="Title"
                                    placeholder="Title"
                                    {...form.getInputProps('title')}
                                    pt="5px"
                                    ta="start"
                                    styles={{
                                        label: { color: '#e0e0e0' },
                                    }}
                                />
                                <TextInput
                                    ta="start"
                                    mt="md"
                                    label="Description"
                                    placeholder="Description"
                                    {...form.getInputProps('description')}
                                    styles={{
                                        label: { color: '#e0e0e0' },
                                    }}
                                />
                            </Stepper.Step>

                            <Stepper.Step
                                label="Second step"
                                description="Upload File"
                                className="step"
                            >
                                <Box>
                                    <h3>Upload File</h3>
                                    <TableUploadFile
                                        array={array}
                                        setArray={setArray}
                                        setFileToSend={setFileToSend}
                                    />
                                    {array.length===0 && (
                                        <div className="mantine-Input-wrapper mantine-TextInput-wrapper error-text">
                                            Please upload a file
                                        </div>
                                    )}
                                </Box>
                            </Stepper.Step>

                            <Stepper.Step
                                label="Final step"
                                description="Fill email"
                                className="step"
                            >
                                <h3>Enter Email</h3>

                                <TextInput
                                    ta="start"
                                    label="Email:"
                                    placeholder="Email to get notified when the project is ready"
                                    {...form.getInputProps('userEmail')}
                                    styles={{
                                        label: {
                                            color: '#e0e0e0',
                                            marginTop: '20px',
                                        },
                                    }}
                                />

                            </Stepper.Step>
                            <Stepper.Completed>
                            <h3>Completed, click back button to get to previous step</h3>

                                <Group position="right" mt="xl">
                                    <Button
                                        w="100%"
                                        onClick={() => {
                                            if (!form.validate().hasErrors) {
                                                handleSubmission(form.values);
                                            }
                                        }}
                                        type="submit"
                                    >
                                        Submit form
                                    </Button>
                                    <Button
                                        w="100%"
                                        variant="default"
                                        onClick={prevStep}
                                    >
                                        Back
                                    </Button>
                                </Group>
                            </Stepper.Completed>
                        </Stepper>

                        <Group position="right" mt="xl">
                            {active !== 3 && (
                                <Button
                                    w="100%"
                                    onClick={nextStep}
                                    className="btn-next"
                                >
                                    Next step
                                </Button>
                            )}
                            {active !== 0 && active !== 3 && (
                                <Button
                                    w="100%"
                                    variant="default"
                                    onClick={prevStep}
                                >
                                    Back
                                </Button>
                            )}
                        </Group>
                    </MantineProvider>
                </div>
            </div>
        </>
    );
}
