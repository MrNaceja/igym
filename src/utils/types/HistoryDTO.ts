import { TExercise } from "./ExerciseDTO";

export type THistory =  {
    id: TExercise['id'],
    name: TExercise['name'],
    group: TExercise['group'],
    hour: string,
    createdAt: string
}

export type THistoryByDate = {
    title: string,
    data: THistory[]
}
