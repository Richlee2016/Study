export const HOME = 'http://www.idyjy.com'
export const ONLINE = 'http://www.dy280.com/'

export const HomeConfig = {
  sub: id => `${HOME}/sub/${id}.html`,
  page: HOME,
  newest: `${HOME}/w.asp?p=1&f=3&l=t`,
  bili: s =>
    `https://search.bilibili.com/all?keyword=${s}&from_source=banner_search`,
  search: w => `http://so.idyjy.com/s.asp?w=${w}`,
  group: n => `${HOME}/html/${n}.html`
}

export const OlineConfig = {
  search: wd => `http://www.dy280.com/index.php?m=vod-search&wd=${wd}`
}
