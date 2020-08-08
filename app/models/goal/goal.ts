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

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type GoalType = Instance<typeof GoalModel>
export interface Goal extends GoalType {}
type GoalSnapshotType = SnapshotOut<typeof GoalModel>
export interface GoalSnapshot extends GoalSnapshotType {}
