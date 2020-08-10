import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const GoalModel = types
  .model("Goal")
  .props({
    id: types.identifier,
    name: types.string,
    target: types.number,
    current: types.optional(types.number, 0),
    color: types.string,
    daily: types.boolean,
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addToCurrent: amount => {
      self.current += amount
    },
    resetCurrent: () => {
      self.current = 0
    },
  }))

type GoalType = Instance<typeof GoalModel>
export interface Goal extends GoalType {}
type GoalSnapshotType = SnapshotOut<typeof GoalModel>
export interface GoalSnapshot extends GoalSnapshotType {}
