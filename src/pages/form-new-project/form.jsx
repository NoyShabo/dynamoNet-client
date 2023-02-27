import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Box, Code, MantineProvider , Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGridDots } from '@tabler/icons-react';
import { DateRangePicker } from '@mantine/dates';


import './form.scss'

export function FormNewProject() {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      dataset: [{name: ""}, ],
      timerange: ''
    },

    validate: (values) => {
      if (active === 0) {
        return {
            title:
            values.title.trim().length < 3
              ? 'Title must include at least 3 characters'
              : null,
            description:
            values.description.length < 6 ? 'Description must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        const errorsObj = {};
        values.dataset.forEach((user,index)=>{
            if(user.name.trim().length < 3){
                errorsObj[`dataset.${index}.name`]= 'Username must include at least 3 characters';
            }
        });
        return errorsObj;
      }

      return {};
    },
  });

  const handelInputText = (event,index) =>{
        event.preventDefault();
        const lines = event.clipboardData.getData('Text').split(/\s+/);
        if(lines.length > 1){
            let counter = 0;
            lines.forEach(user=>{
                if(user){ 
                    counter= counter+1;
                    form.insertListItem('dataset', { name: user });
                } 
            })
            if(counter >0){
                form.removeListItem('dataset', index); 
            }
    }
    
  }

  const fields = form.values.dataset.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs"  {...provided.draggableProps}>
          <Group position="left" className="container-row"   {...provided.dragHandleProps}>
            <IconGridDots size={35} color='#55bbee' />
            <TextInput className='input-user'  onPaste={(e)=>{handelInputText(e,index)}}  placeholder="Twitter Username" {...form.getInputProps(`dataset.${index}.name`)} />
          </Group>
        </Group>
      )}
    </Draggable>
  ));

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className='form-new-project'>
    <div className='form-new-project-container'>
    <MantineProvider theme={{
      colors: {
        brand: ['#63BBEC', '#4384a5', '#63BBEC', '#06AAFF', '#38aae4', '#78b8d8', '	#38aae4', '	#4384a5', '#4384a5', '#38aae4'],
      },
      primaryColor: 'brand',
    }}
    >
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="New project settings" >
        <h3>Create new project</h3>
          <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} pt="5px" ta="start"/>
          <TextInput ta="start"
            mt="md"
            label="Description"
            placeholder="Description"
            {...form.getInputProps('description')}
          />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Add Twitter usernames">
        <Box >
        <h3>Add Usernames from twitter</h3>
        <DragDropContext
        onDragEnd={({ destination, source }) =>
          form.reorderListItem('dataset', { from: source.index, to: destination.index })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Group position="left" mt="md" >
        <Button mb='20px' className="add-btn" onClick={() => form.insertListItem('dataset', { name: '' })} >
          Add UserName
        </Button>
        <Button mb='20px' className='red-btn' onClick={() => {
            if(form.values.dataset.length === 1) return;
            form.removeListItem('dataset', form.values.dataset.length -1 )}} >
          Remove UserName
        </Button>
      </Group>
    </Box>
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Pick dates range">
            <h3>Pick start and end date</h3>
          <DateRangePicker mt="5px" label="Pick dates range" ta='start' placeholder="Pick dates range"  {...form.getInputProps('timerange')} />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:

          {/* <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code> */}
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 3 && <Button w="100%" onClick={nextStep}>Next step</Button>}
        {active !== 0 && (
          <Button w="100%" variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
      </Group>
          </MantineProvider>

    </div>
    </div>
  );
}