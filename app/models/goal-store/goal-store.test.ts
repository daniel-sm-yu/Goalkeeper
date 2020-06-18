import { GoalStoreModel, GoalStore } from "./goal-store"

test("can be created", () => {
  const instance: GoalStore = GoalStoreModel.create({})

  expect(instance).toBeTruthy()
})