const groupWeight = (group) => 1 + group.items.length

export const splitIntoColumns = (groups, columnCount = 2) => {
  const target = groups.reduce((sum, group) => sum + groupWeight(group), 0) / columnCount
  const columns = [[]]
  let currentWeight = 0

  for (const group of groups) {
    if (currentWeight >= target && columns.length < columnCount) {
      columns.push([])
      currentWeight = 0
    }
    columns.at(-1).push(group)
    currentWeight += groupWeight(group)
  }

  return columns
}
