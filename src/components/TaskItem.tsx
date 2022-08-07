import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import { Task } from "./TasksList";

import trashIcon from '../assets/icons/trash/trash.png';
import xIcon from "../assets/icons/x.png";
import editIcon from "../assets/icons/edit.png";

interface TaskItemProps {
  task: Task,
  index: number,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask } : TaskItemProps) {

  const [editingTask, setEditingTask] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditingTask(true);
  }

  function handleCancelEditing() {
    setEditedTaskTitle(task.title);
    setEditingTask(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, editedTaskTitle);
    setEditingTask(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editingTask) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editingTask]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={editedTaskTitle}
            onChangeText={setEditedTaskTitle}
            editable={editingTask}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.actions}>
        { editingTask ? (
          <TouchableOpacity onPress={handleCancelEditing} style={{paddingHorizontal: 16}}>
            <Image source={xIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing} style={{paddingHorizontal: 16}}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.separator}>
        </View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24, paddingLeft: 16, opacity: editingTask ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={editingTask}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 5,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)"
  },
  actions: {
    alignItems: "center",
    flexDirection: "row"
  }
});
