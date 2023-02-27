import React, { useCallback, useEffect, useState } from "react";
import { Table, Row, Col, Card, Empty } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { mutliDragAwareReorder, multiSelectTo as multiSelect } from "./helper.js";
import "./table.scss";

const entitiesMock = {
  metrics: [
    { id: "0", title: "numberOfNodes", value:'5796' },
    { id: "1", title: "numberOfEdges", value:'6891'  },
    { id: "2", title: "density", value:'0.7163165727659121'  },
    { id: "3", title: "diameter", value:'0.000410327315080288'  },
    { id: "4", title: "radius", value:'4'  },
    { id: "5", title: "reciprocity", value:'1'  },
    { id: "6", title: "degreeCentrality", value:'1'  }
  ],
//   metrics: [
//     { id: "0", numberOfNodes: "5796", numberOfEdges: "6891",degreeCentrality: "0.7163165727659121", density: "0.000410327315080288",diameter: "4", radius: "1",reciprocity: "1" },
//   ],
  columnIds: ["todo"],
  columns: {
    todo: {
      id: "todo",
      title: "Metrics",
      taskIds: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        // "10",
        // "11",
        // "12"
      ]
    }
  }
};


// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const PRIMARY_BUTTON_NUMBER = 0;

export const MultiTableDrag = () => {
  const [entities, setEntities] = useState(entitiesMock);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [draggingTaskId, setDraggingTaskId] = useState(null);
//   const [pageSize, setPageSize] = useState(14);

  const tableColumns = [
    // {
    //   title: "Number Of Nodes",
    //   dataIndex: "numberOfNodes"
    // },
    // {
    //   title: "Number Of Edges",
    //   dataIndex: "numberOfEdges"
    // },
    // {
    //   title:"Density",
    //   dataIndex:"density"
    // },
    // {
    //   title:"Degree Centrality",
    //   dataIndex:"degreeCentrality"
    // },
    // {
    //   title:"Diameter",
    //   dataIndex:"diameter"
    // },
    // {
    //   title:"Radius",
    //   dataIndex:"radius"
    // }, 
    // {
    //    title: "Reciprocity",
    //    dataIndex: "reciprocity"
    // },
    // {
    //    title: "ID",
    //    dataIndex: "id"
    // },
   
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title:"Value",
      dataIndex:"value"
    }
  ];

  /**
   * On window click
   */
  const onWindowClick = useCallback((e) => {
    if (e.defaultPrevented) {
      return;
    }

    setSelectedTaskIds([]);
  }, []);

  /**
   * On window key down
   */
  const onWindowKeyDown = useCallback((e) => {
    if (e.defaultPrevented) {
      return;
    }

    if (e.key === "Escape") {
      setSelectedTaskIds([]);
    }
  }, []);

  /**
   * On window touch end
   */
  const onWindowTouchEnd = useCallback((e) => {
    if (e.defaultPrevented) {
      return;
    }

    setSelectedTaskIds([]);
  }, []);

  /**
   * Event Listener
   */
  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    window.addEventListener("keydown", onWindowKeyDown);
    window.addEventListener("touchend", onWindowTouchEnd);

    return () => {
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("keydown", onWindowKeyDown);
      window.removeEventListener("touchend", onWindowTouchEnd);
    };
  }, [onWindowClick, onWindowKeyDown, onWindowTouchEnd]);

  /**
   * Droppable table body
   */
  const DroppableTableBody = ({ columnId, metrics, ...props }) => {
    return (
      <Droppable
        droppableId={columnId}
        // isDropDisabled={columnId === 'todo'}
      >
        {(provided, snapshot) => (
          <tbody
            ref={provided.innerRef}
            {...props}
            {...provided.droppableProps}
            className={`${props.className} ${
              snapshot.isDraggingOver
                ? "is-dragging-over"
                : ""
            }`}
          ></tbody>
        )}
      </Droppable>
    );
  };

  /**
   * Draggable table row
   */
  const DraggableTableRow = ({ index, record, columnId, metrics, ...props }) => {
    if (!metrics.length) {
      return (
        <tr className="ant-table-placeholder row-item" {...props}>
          <td colSpan={tableColumns.length} className="ant-table-cell">
            <div className="ant-empty ant-empty-normal">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </td>
        </tr>
      );
    }

    const isSelected = selectedTaskIds.some(
      (selectedTaskId) => selectedTaskId === record.id
    );
    const isGhosting =
      isSelected && Boolean(draggingTaskId) && draggingTaskId !== record.id;

    return (
      <Draggable
        key={props["data-row-key"]}
        draggableId={props["data-row-key"].toString()}
        index={index}
      >
        {(provided, snapshot) => {
          return (
            <tr
              ref={provided.innerRef}
              {...props}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`row-item ${isSelected ? "row-selected" : ""} ${
                isGhosting ? "row-ghosting" : ""
              } ${snapshot.isDragging ? "row-dragging" : ""}`}

            ></tr>
          );
        }}
      </Draggable>
    );
  };

  /**
   * getMetrics
   */
  const getMetrics = (entities, id) => {
    return entities.columns[id].taskIds.map((taskId) =>
      entities.metrics.find((item) => item.id === taskId)
    );
  };

  /**
   * On before capture
   */
  const onBeforeCapture = (start) => {
    const draggableId = start.draggableId;
    const selected = selectedTaskIds.find((taskId) => taskId === draggableId);

    // if dragging an item that is not selected - unselect all items
    if (!selected) {
      setSelectedTaskIds([]);
    }

    setDraggingTaskId(draggableId);
  };

  /**
   * On drag end
   */
  const onDragEnd = (result) => {
    const destination = result.destination;
    const source = result.source;

    // nothing to do
    if (!destination || result.reason === "CANCEL") {
      setDraggingTaskId(null);
      return;
    }

    const processed = mutliDragAwareReorder({
      entities,
      selectedTaskIds,
      source,
      destination
    });

    console.log("onDragEnd", processed);

    setEntities(processed.entities);
    setDraggingTaskId(null);
  };

  /**
   * Toggle selection
   */
  const toggleSelection = (taskId) => {
    const wasSelected = selectedTaskIds.includes(taskId);

    const newTaskIds = (() => {
      // Task was not previously selected
      // now will be the only selected item
      if (!wasSelected) {
        return [taskId];
      }

      // Task was part of a selected group
      // will now become the only selected item
      if (selectedTaskIds.length > 1) {
        return [taskId];
      }

      // task was previously selected but not in a group
      // we will now clear the selection
      return [];
    })();

    setSelectedTaskIds(newTaskIds);
  };

  /**
   * Toggle selection in group
   */
  const toggleSelectionInGroup = (taskId) => {
    const index = selectedTaskIds.indexOf(taskId);

    // if not selected - add it to the selected items
    if (index === -1) {
      setSelectedTaskIds([...selectedTaskIds, taskId]);

      return;
    }

    // it was previously selected and now needs to be removed from the group
    const shallow = [...selectedTaskIds];
    shallow.splice(index, 1);

    setSelectedTaskIds(shallow);
  };

  /**
   * Multi select to
   * This behaviour matches the MacOSX finder selection
   */
  const multiSelectTo = (newTaskId) => {
    const updated = multiSelect(entities, selectedTaskIds, newTaskId);

    if (updated == null) {
      return;
    }

    setSelectedTaskIds(updated);
  };

  /**
   * On click to row
   * Using onClick as it will be correctly
   * preventing if there was a drag
   */
  const onClickRow = (e, record) => {
    if (e.defaultPrevented) {
      return;
    }

    if (e.button !== PRIMARY_BUTTON_NUMBER) {
      return;
    }

    // marking the event as used
    e.preventDefault();
    performAction(e, record);
  };

  /**
   * On touch end from row
   */
  const onTouchEndRow = (e, record) => {
    if (e.defaultPrevented) {
      return;
    }

    // marking the event as used
    // we would also need to add some extra logic to prevent the click
    // if this element was an anchor
    e.preventDefault();
    toggleSelectionInGroup(record.id);
  };

  /**
   * Was toggle in selection group key used
   * Determines if the platform specific toggle selection in group key was used
   */
  const wasToggleInSelectionGroupKeyUsed = (e) => {
    const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
    return isUsingWindows ? e.ctrlKey : e.metaKey;
  };

  /**
   * Was multi select key used
   * Determines if the multiSelect key was used
   */
  const wasMultiSelectKeyUsed = (e) => e.shiftKey;

  /**
   * Perform action
   */
  const performAction = (e, record) => {
    if (wasToggleInSelectionGroupKeyUsed(e)) {
      toggleSelectionInGroup(record.id);
      return;
    }

    if (wasMultiSelectKeyUsed(e)) {
      multiSelectTo(record.id);
      return;
    }

    toggleSelection(record.id);
  };

  /**
   * Handle table change
   */
//   const handleTableChange = (pagination, filters, sorter) => {
//     const { pageSize } = pagination;
//     setPageSize(pageSize);
//   };

  return (
    <>
      <Card 
        className={`c-multi-drag-table ${draggingTaskId ? "is-dragging" : ""}`}
      >
        <div>
          selectedTaskIds: {JSON.stringify(selectedTaskIds)}
          <br />
          draggingTaskId: {JSON.stringify(draggingTaskId)}
        </div>
        <br />

        <DragDropContext
          onBeforeCapture={onBeforeCapture}
          onDragEnd={onDragEnd}
        >
          <Row gutter={40}>
            {entities.columnIds.map((id) => (
            //   <Col  xs={12}>
                <div key={id} className="inner-col">
                  {/* <Row justify="space-between" align="middle">
                    <h2>{id}</h2>
                    <span>
                      {draggingTaskId && selectedTaskIds.length > 0
                        ? selectedTaskIds.length +
                          " record(s) are being dragged"
                        : draggingTaskId && selectedTaskIds.length <= 0
                        ? "1 record(s) are being dragged"
                        : ""}
                    </span>
                  </Row> */}

                  <Table 
                    dataSource={getMetrics(entities, id)}
                    columns={tableColumns}
                    rowKey="id"
                    // rootClassName={(record, index)=>{ return (index%2 ? "even-row" : "odd-row")}}
                    // rowClassName={(record, index) => {return index%2==0 ? "even-row" : "odd-row"}}
                    // pagination={{
                    //   pageSize,
                    //   total: entitiesMock.columns[id].taskIds.length,
                    //   showSizeChanger: true,
                    //   size: "small"
                    // }}
                    // pagination={{
                        
                    // }}
                    components={{
                      body: {
                        // Custom tbody
                        wrapper: (val) =>
                          DroppableTableBody({
                            columnId: entities.columns[id].id,
                            metrics: getMetrics(entities, id),
                            ...val
                          }),
                        // Custom td
                        row: (val) =>
                          DraggableTableRow({
                            metrics: getMetrics(entities, id),
                            ...val
                          })
                      }
                    }}
                    // Set props on per row (td)
                    onRow={(record, index) => ({
                      index,
                      record,
                      onClick: (e) => onClickRow(e, record),
                      onTouchEnd: (e) => onTouchEndRow(e, record)
                    })}
                    // onChange={handleTableChange}
                  />
                </div>
            //   </Col>
            ))}
          </Row>
        </DragDropContext>
      </Card>
    </>
  );
};
