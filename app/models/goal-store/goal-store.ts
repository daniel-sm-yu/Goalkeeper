/* eslint-disable generator-star-spacing */
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GoalModel, GoalSnapshot, Goal } from "../goal/goal"
import uuid from "react-native-uuid"

/**
 * Model description here for TypeScript hints.
 */
export const GoalStoreModel = types
  .model("GoalStore")
  .props({
    active: types.optional(types.identifier, ""),
    goals: types.optional(types.array(GoalModel), []),
  })
  .views(self => ({
    get dailyGoals() {
      return self.goals.filter(goal => goal.today)
    },
    get nonDailyGoals() {
      return self.goals.filter(goal => !goal.today)
    },
    get goalCount() {
      return self.goals.length
    },
  }))
  .actions(self => ({
    addGoal: (name: string, hour: number, minute: number, color: string, today: boolean) => {
      const data = { id: uuid.v4(), name, target: hour * 60 + minute, color, today }
      const goal = GoalModel.create(data)
      console.log(goal)
    },
    saveGoals: (goalSnapshots: GoalSnapshot[]) => {
      const goalModels: Goal[] = goalSnapshots.map(goal => GoalModel.create(goal))
      self.goals.replace(goalModels)
    },
  }))
  .actions(self => ({
    getGoals: () => {
      // get goals from storage
      // self.saveGoals(goals)
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.getGoals()
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type GoalStoreType = Instance<typeof GoalStoreModel>
export interface GoalStore extends GoalStoreType {}
type GoalStoreSnapshotType = SnapshotOut<typeof GoalStoreModel>
export interface GoalStoreSnapshot extends GoalStoreSnapshotType {}
