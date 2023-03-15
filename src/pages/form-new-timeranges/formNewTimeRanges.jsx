import {
  Box,
  Button,
  Center,
  Code,
  Group,
  MantineProvider,
  Select,
  Stepper,
  TextInput,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createTimeRanges } from "../../serverApi/rest/timeRangeApi";
import "./formNewTimeRanges.scss";

export function FormNewTimeRanges() {
  const [active, setActive] = useState(0);
  const { projectId, networkId } = useParams();
  const navigate = useNavigate();
  const project = useSelector((state) => state.projectModule.project);

  function backPrevPage() {
    navigate(-1);
  }

  const handleSubmission = async (values) => {
    const timeWindows = values.timeWindows.map((timeWindow) => {
      return {
        title: timeWindow.title.trim(),
        startDate: timeWindow.timeRange[0],
        endDate: timeWindow.timeRange[1],
      };
    });
    const timeRanges = {
      projectId: projectId,
      networkId: networkId,
      edgeType: values.edgeType.trim(),
      timeWindows: timeWindows,
    };
    await createTimeRanges(timeRanges);
    navigate(`/project/${projectId}`);
  };

  const form = useForm({
    initialValues: {
      edgeType: "",
      timeWindows: [
        {
          title: "",
          timeRange: "",
        },
      ],
    },

    validate: (values) => {
      if (active === 0) {
        const errors = {};
        values.timeWindows.forEach((timeWindow, index) => {
          if (!timeWindow.title || timeWindow.title.trim().length < 1) {
            errors[`timeWindows.${index}.title`] = "Title is required";
          }
          if (
            !timeWindow.timeRange ||
            timeWindow.timeRange.length < 2 ||
            timeWindow.timeRange[0] === null ||
            timeWindow.timeRange[1] === null
          ) {
            errors[`timeWindows.${index}.timeRange`] = "Time range is required";
          }
        });
        return errors;
      }

      if (active === 1) {
        return {
          edgeType:
            !values.edgeType || values.edgeType.trim().length < 1
              ? "Edge type is required"
              : null,
        };
      }

      return {};
    },
  });
  form.onSubmit(handleSubmission);

  const fields = form.values.timeWindows.map((timeWindow, index) => {
    return (
      <div key={index} className="form__field">
        <TextInput
          label="Title"
          placeholder="Title"
          required
          // value={timeWindow.title}
          onChange={(event) =>
            form.setFieldValue(
              `timeWindows.${index}.title`,
              event.currentTarget.value
            )
          }
          {...form.getInputProps(`timeWindows.${index}.title`)}
        />
        <DateRangePicker
          label="Date range"
          required
          placeholder="Date range"
          initialMonth={project ? new Date(project.startDate) : null}
          minDate={project ? new Date(project.startDate) : null}
          maxDate={project ? new Date(project.endDate) : null}
          onChange={(values) => {
            form.setFieldValue(`timeWindows.${index}.timeRange`, values);
          }}
          {...form.getInputProps(`timeWindows.${index}.timeRange`)}
        />
      </div>
    );
  });

  const insertTimeWindow = (event) => {
    event.preventDefault();
    form.insertListItem("timeWindows", {
      title: "",
      startDate: "",
      endDate: "",
    });
  };

  const removeTimeWindow = (event) => {
    event.preventDefault();
    const last = form.values.timeWindows.length - 1;
    if (last > 0) form.removeListItem("timeWindows", last);
  };

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current + 1;
    });

  const previousStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
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
        New time range
      </div>
      <div className="form-new-timeranges">
        <div className="form-new-project-container">
          <MantineProvider
            theme={{
              colors: {
                brand: [
                  "#63BBEC",
                  "#4384a5",
                  "#63BBEC",
                  "#06AAFF",
                  "#38aae4",
                  "#78b8d8",
                  "	#38aae4",
                  "	#4384a5",
                  "#4384a5",
                  "#38aae4",
                ],
              },
              primaryColor: "brand",
            }}
          >
            <Stepper active={active} breakpoint="sm">
              <Stepper.Step
                label="First step"
                description="New Timerange settings"
              >
                <h3>Create new Timerange</h3>
                <div className="form__field">
                  {fields}
                  <Button className="btn-add-tr" onClick={insertTimeWindow}>
                    Add Time Window
                  </Button>
                  <Button onClick={removeTimeWindow}>Remove Time Window</Button>
                </div>
              </Stepper.Step>

              <Stepper.Step
                label="Second step"
                description="Add Timerange type"
              >
                <h3>Timerange type</h3>
                <div className="form__field">
                  <Select
                    label="Edge Type"
                    placeholder="Edge Type"
                    required
                    // value={form.values.edgeType}
                    onChange={(value) =>
                      form.setFieldValue("edgeType", value.toLowerCase())
                    }
                    // data={[
                    //   { label: "All", value: "all" },
                    //   { label: "Retweet", value: "retweet" },
                    //   { label: "Quote", value: "quote" },
                    // ]}
                    data={[
                      { label: "All", value: "all" },
                      ...(!project
                        ? []
                        : project.edgeTypes.map((edgeType) => {
                            return { label: edgeType, value: edgeType };
                          })),
                    ]}
                    {...form.getInputProps("edgeType")}
                  />
                </div>
              </Stepper.Step>
            </Stepper>

            <Group position="center" mt={"45px"} className="btns-container">
              <Button
                variant="outline"
                onClick={() => previousStep()}
                disabled={active === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => nextStep()}
                disabled={active === 1}
              >
                Next
              </Button>
              <Button
                type="submit"
                mt="xl"
                className="sub-btn"
                onClick={() => {
                  if (!form.validate().hasErrors) {
                    handleSubmission(form.values);
                  }
                }}
                disabled={active !== 1}
              >
                Submit
              </Button>
            </Group>
            {/* </form> */}
          </MantineProvider>
        </div>
      </div>
    </>
  );
}
// import {
//   Box,
//   Button,
//   Center,
//   Code,
//   Group,
//   MantineProvider,
//   Select,
//   Stepper,
//   TextInput,
// } from "@mantine/core";
// import { DateRangePicker } from "@mantine/dates";
// import { useForm } from "@mantine/form";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { createTimeRanges } from "../../serverApi/rest/timeRangeApi";
// import "./formNewTimeRanges.scss";

// export function FormNewTimeRanges() {
//   const [active, setActive] = useState(0);
//   const { projectId, networkId } = useParams();
//   const navigate = useNavigate();
//   const project = useSelector((state) => state.projectModule.project);

//   const handleSubmission = async (values) => {
//     const timeWindows = values.timeWindows.map((timeWindow) => {
//       return {
//         title: timeWindow.title.trim(),
//         startDate: timeWindow.timeRange[0],
//         endDate: timeWindow.timeRange[1],
//       };
//     });
//     const timeRanges = {
//       projectId: projectId,
//       networkId: networkId,
//       edgeType: values.edgeType.trim(),
//       timeWindows: timeWindows,
//     };
//     await createTimeRanges(timeRanges);
//     navigate(`/project/${projectId}`);
//   };

//   const form = useForm({
//     initialValues: {
//       edgeType: "",
//       timeWindows: [
//         {
//           title: "",
//           timeRange: "",
//         },
//       ],
//     },

//     validate: (values) => {
//       if (active === 0) {
//         const errors = {};
//         values.timeWindows.forEach((timeWindow, index) => {
//           if (!timeWindow.title || timeWindow.title.trim().length < 1) {
//             errors[`timeWindows.${index}.title`] = "Title is required";
//           }
//           if (
//             !timeWindow.timeRange ||
//             timeWindow.timeRange.length < 2 ||
//             timeWindow.timeRange[0] === null ||
//             timeWindow.timeRange[1] === null
//           ) {
//             errors[`timeWindows.${index}.timeRange`] = "Time range is required";
//           }
//         });
//         return errors;
//       }

//       if (active === 1) {
//         return {
//           edgeType:
//             !values.edgeType || values.edgeType.trim().length < 1
//               ? "Edge type is required"
//               : null,
//         };
//       }

//       return {};
//     },
//   });

//   const fields = form.values.timeWindows.map((timeWindow, index) => {
//     return (
//       <div key={index} className="form__field">
//         <TextInput
//           label="Title"
//           placeholder="Title"
//           required
//           // value={timeWindow.title}
//           onChange={(event) =>
//             form.setFieldValue(
//               `timeWindows.${index}.title`,
//               event.currentTarget.value
//             )
//           }
//           {...form.getInputProps(`timeWindows.${index}.title`)}
//         />
//         <DateRangePicker
//           label="Date range"
//           required
//           placeholder="Date range"
//           initialMonth={project ? new Date(project.startDate) : null}
//           minDate={project ? new Date(project.startDate) : null}
//           maxDate={project ? new Date(project.endDate) : null}
//           onChange={(values) => {
//             form.setFieldValue(`timeWindows.${index}.timeRange`, values);
//           }}
//           {...form.getInputProps(`timeWindows.${index}.timeRange`)}
//         />
//       </div>
//     );
//   });

//   const insertTimeWindow = (event) => {
//     event.preventDefault();
//     form.insertListItem("timeWindows", {
//       title: "",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const removeTimeWindow = (event) => {
//     event.preventDefault();
//     const last = form.values.timeWindows.length - 1;
//     if (last > 0) form.removeListItem("timeWindows", last);
//   };

//   const nextStep = () =>
//     setActive((current) => {
//       if (form.validate().hasErrors) {
//         return current;
//       }
//       return current + 1;
//     });

//   const previousStep = () =>
//     setActive((current) => (current > 0 ? current - 1 : current));

//   return (
//     <>
//       <div className="title-project title-header">New time range</div>
//       <div className="form-new-timeranges">
//         <div className="form-new-project-container">
//           <MantineProvider
//             theme={{
//               colors: {
//                 brand: [
//                   "#63BBEC",
//                   "#4384a5",
//                   "#63BBEC",
//                   "#06AAFF",
//                   "#38aae4",
//                   "#78b8d8",
//                   "	#38aae4",
//                   "	#4384a5",
//                   "#4384a5",
//                   "#38aae4",
//                 ],
//               },
//               primaryColor: "brand",
//             }}
//           >
//             <Stepper
//               value={active}
//               onChange={setActive}
//               data={[{ label: "Time Windows" }, { label: "Edge Type" }]}
//             />
//             <form onSubmit={form.onSubmit(handleSubmission)}>
//               {active === 0 && (
//                 <div className="form__field">
//                   <Button className="btn-add-tr" onClick={insertTimeWindow}>
//                     Add Time Window
//                   </Button>
//                   <Button onClick={removeTimeWindow}>Remove Time Window</Button>
//                   {fields}
//                 </div>
//               )}
//               {active === 1 && (
//                 <div className="form__field">
//                   <Select
//                     label="Edge Type"
//                     placeholder="Edge Type"
//                     required
//                     // value={form.values.edgeType}
//                     onChange={(value) =>
//                       form.setFieldValue("edgeType", value.toLowerCase())
//                     }
//                     data={[
//                       { label: "All", value: "all" },
//                       { label: "Retweet", value: "retweet" },
//                       { label: "Quote", value: "quote" },
//                     ]}
//                     {...form.getInputProps("edgeType")}
//                   />
//                 </div>
//               )}
//               <Group position="center">
//                 <Button
//                   variant="outline"
//                   onClick={() => previousStep()}
//                   disabled={active === 0}
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => nextStep()}
//                   disabled={active === 1}
//                 >
//                   Next
//                 </Button>
//                 <Button type="submit" disabled={active !== 1}>
//                   Submit
//                 </Button>
//               </Group>
//             </form>
//           </MantineProvider>
//         </div>
//       </div>
//     </>
//   );
// }
