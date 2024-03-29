import {
  Box,
  Button,
  Group,
  MantineProvider,
  Stepper,
  TextInput,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconGridDots } from "@tabler/icons-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../serverApi/rest/projectApi";

import "./form.scss";

export function FormNewProject() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  function backPrevPage() {
    navigate(-1);
  }

  const handleSubmission = async (values) => {
    const dataset = values.dataset.map((user) => {
      return {
        name: user.name,
      };
    });
    const filteredDataset = dataset.filter((user) => user.name !== "");
    const keywords = values.keywords.map((key) => {
      return {
        keyword: key.keyword,
      };
    });
    const filteredKeywords = keywords.filter((key) => key.keyword !== "");
    const project = {
      title: values.title,
      description: values.description,
      dataset: filteredDataset.map((user) => user.name),
      keywords: filteredKeywords.map((key) => key.keyword),
      startDate: values.timerange[0],
      endDate: values.timerange[1],
      userEmail: values.userEmail,
    };
    const res = await createProject(project);
    navigate(`/project/${res.project._id}`);
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      dataset: [{ name: "" }],
      timerange: "",
      userEmail: "",
      keywords: [{ keyword: "" }],
    },

    validate: (values) => {
      if (active === 0) {
        return {
          title:
            values.title.trim().length < 3
              ? "Title must include at least 3 characters"
              : null,
          description:
            values.description.length < 6
              ? "Description must include at least 6 characters"
              : null,
        };
      }

      if (active === 1) {
        const errorsObj = {};
        if (values.dataset.length === 1 && values.keywords.length === 1) {
          if (
            values.dataset[0].name.trim().length === 0 &&
            values.keywords[0].keyword.trim().length === 0
          ) {
            errorsObj[`dataset.${0}.name`] = "Must include Username or Keyword";

            errorsObj[`keywords.${0}.keyword`] =
              "Must include Username or Keyword";
          }
        } else {
          values.dataset.forEach((user, index) => {
            if (user.name.trim().length < 2) {
              errorsObj[`dataset.${index}.name`] =
                "Username must include at least 2 characters";
            }
          });
        }
        return errorsObj;
      }

      if (active === 2) {
        return {
          timerange:
            values.timerange.length < 2 ? "Please select a time range" : null,
        };
      }

      if (active === 3) {
        return {
          userEmail:
            values.userEmail.trim().length < 3
              ? "Email must include at least 3 characters"
              : null,
        };
      }

      return {};
    },
  });

  form.onSubmit(handleSubmission);

  const handelInputText = (event, index) => {
    event.preventDefault();
    const lines = event.clipboardData.getData("Text").split(/\s+/);
    if (lines.length > 1) {
      let counter = 0;
      lines.forEach((user) => {
        if (user) {
          counter = counter + 1;
          form.insertListItem("dataset", { name: user });
        }
      });
      if (counter > 0) {
        form.removeListItem("dataset", index);
      }
    }
  };

  const handelInputTextKeyword = (event, index) => {
    event.preventDefault();
    const lines = event.clipboardData.getData("Text").split(/\s+/);
    if (lines.length > 1) {
      let counter = 0;
      lines.forEach((key) => {
        if (key) {
          counter = counter + 1;
          form.insertListItem("keywords", { keyword: key });
        }
      });
      if (counter > 0) {
        form.removeListItem("keywords", index);
      }
    }
  };

  const fields = form.values.dataset.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Group
            position="left"
            className="container-row"
            {...provided.dragHandleProps}
          >
            <IconGridDots size={35} color="#70d8bd" />
            <TextInput
              className="input-user"
              onPaste={(e) => {
                handelInputText(e, index);
              }}
              placeholder="Twitter Username"
              {...form.getInputProps(`dataset.${index}.name`)}
            />
          </Group>
        </Group>
      )}
    </Draggable>
  ));

  const fieldsKeywords = form.values.keywords.map((_, index) => {
    return (
      <Draggable key={index + "k"} index={index} draggableId={index.toString()}>
        {(provided) => (
          <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
            <Group
              position="left"
              className="container-row"
              {...provided.dragHandleProps}
            >
              <IconGridDots size={35} color="#70d8bd" />
              <TextInput
                className="input-user"
                onPaste={(e) => {
                  handelInputTextKeyword(e, index);
                }}
                placeholder="Keyword"
                {...form.getInputProps(`keywords.${index}.keyword`)}
              />
            </Group>
          </Group>
        )}
      </Draggable>
    );
  });

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
                borderRadius: "50%",
                backgroundColor: "#222c45",
                color: "#fff",
                padding: "8px",
                fontSize: "50px",
                position: "absolute",
                left: "20px",
                top: " 105px",
                cursor: "pointer",
              }}
            />
          </span>
          New Twitter Project
        </div>
      </div>
      <div className="form-new-project">
        <div className="form-new-project-container">
          <MantineProvider
            theme={{
              colors: {
                brand: [
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                  "#70d8bd",
                ],
              },
              primaryColor: "brand",
            }}
          >
            <Stepper active={active} breakpoint="sm" color={"#70d8bd"}>
              <Stepper.Step
                label="First step"
                description="New project settings"
                labelprops={{ style: { color: "#70d8bd" } }}
                className="step"
              >
                <h3>Create new project</h3>
                <TextInput
                  label="Title"
                  placeholder="Title"
                  {...form.getInputProps("title")}
                  pt="5px"
                  ta="start"
                  styles={{
                    label: { color: "#e0e0e0" },
                  }}
                />
                <TextInput
                  ta="start"
                  mt="md"
                  label="Description"
                  placeholder="Description"
                  {...form.getInputProps("description")}
                  styles={{
                    label: { color: "#e0e0e0" },
                  }}
                />
              </Stepper.Step>

              <Stepper.Step
                label="Second step"
                description="Add Twitter usernames"
                className="step"
              >
                <Box>
                  <h3>Add Usernames from twitter</h3>
                  <DragDropContext
                    onDragEnd={({ destination, source }) =>
                      form.reorderListItem("dataset", {
                        from: source.index,
                        to: destination.index,
                      })
                    }
                  >
                    <Droppable droppableId="dnd-list" direction="vertical">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {fields}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  <Group position="left" mt="md">
                    <Button
                      mb="20px"
                      className="add-btn"
                      onClick={() =>
                        form.insertListItem("dataset", { name: "" })
                      }
                    >
                      Add UserName
                    </Button>
                    <Button
                      mb="20px"
                      className="red-btn"
                      onClick={() => {
                        if (form.values.dataset.length === 1) return;
                        form.removeListItem(
                          "dataset",
                          form.values.dataset.length - 1
                        );
                      }}
                    >
                      Remove UserName
                    </Button>
                  </Group>
                </Box>
                <Box>
                  <h3>Add Keywords from twitter</h3>
                  <DragDropContext
                    onDragEnd={({ destination, source }) =>
                      form.reorderListItem("keywords", {
                        from: source.index,
                        to: destination.index,
                      })
                    }
                  >
                    <Droppable droppableId="dnd-list" direction="vertical">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {fieldsKeywords}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  <Group position="left" mt="md">
                    <Button
                      mb="20px"
                      className="add-btn"
                      onClick={() =>
                        form.insertListItem("keywords", { keyword: "" })
                      }
                    >
                      Add Keyword
                    </Button>
                    <Button
                      mb="20px"
                      className="red-btn"
                      onClick={() => {
                        if (form.values.keywords.length === 1) return;
                        form.removeListItem(
                          "keywords",
                          form.values.keywords.length - 1
                        );
                      }}
                    >
                      Remove keyWord
                    </Button>
                  </Group>
                </Box>
              </Stepper.Step>

              <Stepper.Step
                label="Final step"
                description="Pick dates range"
                className="step"
              >
                <h3>Pick start and end date</h3>

                <DateRangePicker
                  mt="5px"
                  label="Pick dates range"
                  ta="start"
                  placeholder="Pick dates range"
                  {...form.getInputProps("timerange")}
                  styles={{
                    label: { color: "#e0e0e0" },
                  }}
                />
              </Stepper.Step>
              <Stepper.Completed>
                <h3>Enter Email</h3>
                <TextInput
                  ta="start"
                  label="Email:"
                  placeholder="Email to get notified when the project is ready"
                  {...form.getInputProps("userEmail")}
                  styles={{
                    label: { color: "#e0e0e0", marginTop: "20px" },
                  }}
                />
                <Group position="right" mt="xl">
                  <Button
                    w="100%"
                    onClick={() => {
                      if (!form.validate().hasErrors) {
                        handleSubmission(form.values);
                      }
                    }}
                  >
                    Submit form
                  </Button>
                  <Button w="100%" variant="default" onClick={prevStep}>
                    Back
                  </Button>
                </Group>
              </Stepper.Completed>
            </Stepper>

            <Group position="right" mt="xl">
              {active !== 3 && (
                <Button w="100%" onClick={nextStep} className="btn-next">
                  Next step
                </Button>
              )}
              {active !== 0 && active !== 3 && (
                <Button w="100%" variant="default" onClick={prevStep}>
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
