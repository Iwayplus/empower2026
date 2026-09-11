const numericPriority = (item) => {
  const priority = Number(item?.priority);
  return Number.isFinite(priority) ? priority : 0;
};

export const sortByPriority = (items) =>
  [...items].sort((first, second) => numericPriority(second) - numericPriority(first));
