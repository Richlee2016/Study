import { Context } from "midway";
import { MovieModelType } from "../../lib/model/movie";
export function getTop(ctx: Context, model: MovieModelType): Promise<number>;
