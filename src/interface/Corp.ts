export interface Corp {
  no: number;
  corpname: string;
  city: string;
  gugun: string;
  hashtag: number[];
}

export type CorpDto = Corp & {
  cnt: number;
  avg: number;
  [key: string]: string | number | null | any[];
};
