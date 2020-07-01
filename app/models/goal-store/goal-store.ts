import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GoalModel, GoalSnapshot, Goal } from "../goal/goal"
import uuid from "react-native-uuid" // https://www.npmjs.com/package/react-native-uuid

let interval

export const GoalStoreModel = types
  .model("GoalStore")
  .props({
    active: types.optional(types.string, ""),
    goals: types.optional(types.array(GoalModel), []),
  })
  .views(self => ({
    get activeGoal() {
      return self.goals.find(goal => goal.id === self.active)
    },
    get dailyGoals() {
      return self.goals.filter(goal => goal.today)
    },
    get nonDailyGoals() {
      return self.goals.filter(goal => !goal.today)
    },
  }))
  .actions(self => ({
    startTimer: () => {
      if (self.activeGoal) {
        interval = setInterval(() => self.activeGoal.addToCurrent(1), 1000 * 60)
      }
    },
    stopTimer: () => clearInterval(interval),
  }))
  .actions(self => ({
    addGoal: (name: string, hour: number, minute: number, color: string, today: boolean) => {
      const goalData = { id: uuid.v4(), name, target: hour * 60 + minute, color, today }
      const newGoal = GoalModel.create(goalData)
      self.goals.push(newGoal)
      // add to storage
      console.log(self.goals)
    },
    saveGoals: (goalSnapshots: GoalSnapshot[]) => {
      const goalModels: Goal[] = goalSnapshots.map(goal => GoalModel.create(goal))
      self.goals.replace(goalModels)
    },
    setActive: (id: string) => {
      self.stopTimer()
      self.active = id
      self.startTimer()
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
      // self.saveGoals([]) // use to delete all goals
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
