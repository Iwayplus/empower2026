// Higher priority is shown first. Keep the existing numeric order as a tie-breaker
// for speakers that have not been assigned a priority yet.
export const compareSpeakerPriority = (a, b) => {
  const priorityDifference = (Number(b.priority) || 0) - (Number(a.priority) || 0);
  if (priorityDifference) return priorityDifference;

  const oldOrderA = Number.parseInt(a.special_requirements, 10);
  const oldOrderB = Number.parseInt(b.special_requirements, 10);
  return (Number.isNaN(oldOrderA) ? Infinity : oldOrderA)
    - (Number.isNaN(oldOrderB) ? Infinity : oldOrderB);
};
