import { useCallback, useState } from 'react';
import { TodoItemContainer } from './TodoItemContainer';
import { TodoItemEditForm } from './TodoItemEditForm';

export const Todo = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const changeModeHandler = useCallback(
    (editModeFlg) => () => {
      setIsEdit(editModeFlg);
    },
    [],
  );

  return isEdit ? (
    <TodoItemEditForm {...props} onEditModeEnd={changeModeHandler(false)} />
  ) : (
    <TodoItemContainer {...props} onChangeEditMode={changeModeHandler(true)} />
  );
};
