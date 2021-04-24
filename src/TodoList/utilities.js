export const getTodoDataById = (todos) => (id) => {
  const todoMap = new Map(todos);
  const item = todoMap.get(id);
  if (!item) {
    return null;
  }

  return item;
};
