import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GoalModel, Goal } from "../goal/goal"
import uuid from "react-native-uuid"

let interval

export const GoalStoreModel = types
  .model("GoalStore")
  .props({
    activeId: types.optional(types.string, ""),
    goals: types.optional(types.array(GoalModel), []),
  })
  .views(self => ({
    get activeGoal() {
      return self.goals.find(goal => goal.id === self.activeId)
    },
  }))
  .actions(self => ({
    setGoals: (goals: Goal[]) => {
      self.goals.replace(goals)
    },
    getGoal: (id: string) => {
      return self.goals.find(goal => goal.id === id)
    },
    startTimer: () => {
      if (self.activeGoal) {
        interval = setInterval(() => self.activeGoal.addToCurrent(0.1), 1000 * 6) // 6 seconds
      }
    },
    stopTimer: () => clearInterval(interval),
  }))
  .actions(self => ({
    addGoal: (name: string, hour: number, minute: number, color: string, daily: boolean) => {
      const goalData = { id: uuid.v4(), name, target: hour * 60 + minute, color, daily }
      const newGoal = GoalModel.create(goalData)
      self.goals.push(newGoal)
    },
    editGoal: (
      id: string,
      name: string,
      hour: number,
      minute: number,
      color: string,
      daily: boolean,
    ) => {
      self.getGoal(id).name = name
      self.getGoal(id).target = hour * 60 + minute
      self.getGoal(id).color = color
      self.getGoal(id).daily = daily
    },
    deleteGoal: (id: string) => {
      self.setGoals(self.goals.filter(goal => goal.id !== id))
    },
    setActiveId: (id: string) => {
      self.stopTimer()
      self.activeId = id
      self.startTimer()
    },
  }))
  .actions(self => ({
    newDay: () => {
      self.setActiveId("")
      self.goals.forEach(goal => {
        if (goal.daily) {
          self.getGoal(goal.id).resetCurrent()
        } else {
          self.deleteGoal(goal.id)
        }
      })
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
