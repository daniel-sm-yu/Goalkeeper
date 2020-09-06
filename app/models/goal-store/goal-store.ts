import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GoalModel, Goal } from "../goal/goal"
import uuid from "react-native-uuid"

let interval

export const GoalStoreModel = types
  .model("GoalStore")
  .props({
    activeId: types.optional(types.string, ""),
    goals: types.optional(types.array(GoalModel), []),
    points: types.optional(types.number, 0),
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
      let points = 0
      self.goals.forEach(goal => {
        if (goal.current < goal.target) {
          points += goal.current
        } else {
          points += goal.target * 1.25
        }

        if (goal.daily) {
          self.getGoal(goal.id).resetCurrent()
        } else {
          self.deleteGoal(goal.id)
        }
      })
      self.points += Math.round(points)
    },
  }))

type GoalStoreType = Instance<typeof GoalStoreModel>
export interface GoalStore extends GoalStoreType {}
type GoalStoreSnapshotType = SnapshotOut<typeof GoalStoreModel>
export interface GoalStoreSnapshot extends GoalStoreSnapshotType {}
