export interface IMovie {
  name: string;
  score: number;
  area: string;
  othername: string;
  year: number;
  img: string;
  cover: string;
  isFinish: string;
  imdb: string;
  catalog: string[];
  classify: string[];
  actor: string[];
  director: string[];
  intro: string;
  url: Array<string[]>;
  meta: {
    createAt: number;
    updateAt: number;
  };
}
