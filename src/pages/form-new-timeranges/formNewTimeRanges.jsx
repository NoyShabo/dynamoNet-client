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
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTimeRanges } from "../../serverApi/rest/timeRangeApi";
import "./formNewTimeRanges.scss";

export function FormNewTimeRanges() {
  const [active, setActive] = useState(0);
  const { projectId, networkId } = useParams();
  const navigate = useNavigate();

  const handleSubmission = async (values) => {
    const timeWindows = values.timeWindows.map((timeWindow) => {
      return {
        title: timeWindow.title,
        startDate: timeWindow.startDate,
        endDate: timeWindow.endDate,
      };
    });
    const timeRanges = {
      projectId: projectId,
      networkId: networkId,
      edgeType: values.edgeType,
      timeWindows: timeWindows,
    };
    await createTimeRanges(timeRanges);
    // console.log(timeRanges);
    // send the user to /project/:projectId
    navigate(`/project/${projectId}`);
  };

  const form = useForm({
    initialValues: {
      edgeType: "",
      timeWindows: [
        {
          title: "",
          startDate: "",
          endDate: "",
        },
      ],
    },

    validate: (values) => {
      return {};
    },
  });

  const fields = form.values.timeWindows.map((timeWindow, index) => {
    return (
      <div key={index} className="form__field">
        <TextInput
          label="Title"
          placeholder="Title"
          required
          value={timeWindow.title}
          onChange={(event) =>
            form.setFieldValue(
              `timeWindows.${index}.title`,
              event.currentTarget.value
            )
          }
        />
        <DateRangePicker
          label="Date range"
          required
          value={[
            form.getInputProps(`timeWindows.${index}.startDate`).value,
            form.getInputProps(`timeWindows.${index}.endDate`).value,
          ]}
          onChange={(values) => {
            form.setFieldValue(`timeWindows.${index}.startDate`, values[0]);
            form.setFieldValue(`timeWindows.${index}.endDate`, values[1]);
          }}
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

  return (
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
          <Stepper
            value={active}
            onChange={setActive}
            data={[{ label: "Time Windows" }, { label: "Edge Type" }]}
          />
          <form onSubmit={form.onSubmit(handleSubmission)}>
            {active === 0 && (
              <div className="form__field">
                <Button onClick={insertTimeWindow}>Add Time Window</Button>
                <Button onClick={removeTimeWindow}>Remove Time Window</Button>
                {fields}
              </div>
            )}
            {active === 1 && (
              <div className="form__field">
                <Select
                  label="Edge Type"
                  placeholder="Edge Type"
                  required
                  value={form.values.edgeType}
                  onChange={(value) =>
                    form.setFieldValue("edgeType", value.toLowerCase())
                  }
                  data={[
                    { label: "All", value: "all" },
                    { label: "Retweet", value: "retweet" },
                    { label: "Quote", value: "quote" },
                  ]}
                />
              </div>
            )}
            <Group position="center">
              <Button
                variant="outline"
                onClick={() => setActive((value) => value - 1)}
                disabled={active === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setActive((value) => value + 1)}
                disabled={active === 1}
              >
                Next
              </Button>
              <Button type="submit" disabled={active !== 1}>
                Submit
              </Button>
            </Group>
          </form>
        </MantineProvider>
      </div>
    </div>
  );
}
