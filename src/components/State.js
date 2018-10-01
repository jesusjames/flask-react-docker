import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class State extends Component {

    render() {
        const { taskState, getListStyle, getItemStyle } = this.props;
        const task = {
        todo: [
            {
                _id: 0,
                title: 'todo test 0'
            },
            {
                _id: 1,
                title: 'todo test 1'
            }
        ],
        doing: [
            {
                _id: 2,
                title: 'doing test 0'
            },
            {
                _id: 3,
                title: 'doing test 1'
            }
        ],
        done: [
            {
                _id: 4,
                title: 'done test 0'
            },
            {
                _id: 5,
                title: 'done test 1'
            }
        ]
        };
        return (
            <div>
                <Droppable droppableId={taskState} >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            { Object.keys(task).length > 0 &&
                                task[taskState].map((item, index) => (
                                <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.title}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable >
            </div>
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(State);