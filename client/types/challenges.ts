interface ChallengesType {
  id: string
  title: string
  description: string
}

type ChallengesResponseType = PageableType & {
  content: ChallengesType[]
}

type ChallengesTypelist = ChallengesType[]
