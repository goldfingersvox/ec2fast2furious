import { Heading as RadixHeading } from '@radix-ui/themes'
import { PropsWithChildren } from 'react';

type LevelType = 1 | 2 | 3 | 4 | 5 | 6;

type SizeType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

interface Props {
  level: LevelType
}

const headingSizeMap: Record<LevelType, SizeType> = {
  1: "9",
  2: "8",
  3: "7",
  4: "6",
  5: "5",
  6: "4",
}


export function Heading({level, children}: PropsWithChildren<Props>) {
  
  return (
    <RadixHeading as={`h${level}`} size={headingSizeMap[level]}>{children}</RadixHeading>
  )
}
