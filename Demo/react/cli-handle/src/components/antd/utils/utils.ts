const NAME_LINE = '__';
const NameReg = /^([A-Za-z]+)__(\d+)$/;

// 构造 分组名称
export function makeName(str: string, idx: number) {
  return `${str}${NAME_LINE}${idx}`;
}

// 解析分组数据
export function groupDistribut(groups: Record<string, any>, types: string[]) {
  let group: Record<string, any>[] = [];
  for (const [key, val] of Object.entries(groups)) {
    const match = key.match(NameReg);
    if (match) {
      const [, name, idx] = match;
      if (types.includes(name)) {
        const myGroup = group[Number(idx)];
        group[Number(idx)] = myGroup || {};
        group[Number(idx)][name] = val;
      }
    }
  }
  return group;
}
