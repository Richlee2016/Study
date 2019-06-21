/** modle type */
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
/** search type */
export interface SearchMovie {
  page?: number;
  size?: number;
  year?: number;
  director?: string;
  actor?: string;
  classify?: string;
  catalog?: string;
}
